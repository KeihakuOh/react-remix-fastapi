import { json, redirect } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, useLoaderData, useNavigation, useFetcher } from "@remix-run/react";
import { getTasks, createTask, deleteTask } from "~/lib/api.server";
import { requireUserSession, logout } from "~/lib/auth.server";
import { TaskForm } from "~/components/TaskForm";
import { TaskItem } from "~/components/TaskItem";
import { UserInfo } from "~/components/UserInfo";

export const meta: MetaFunction = () => {
  return [
    { title: "タスク管理 - Team Todo" },
    { name: "description", content: "チームのタスク管理" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const token = await requireUserSession(request);
  
  // JWTトークンからユーザー名を取得
  let username = "ユーザー";
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    username = payload.sub;
  } catch (error) {
    console.error("Failed to decode token:", error);
  }
  
  try {
    const tasks = await getTasks(token);
    return json({ tasks, username });
  } catch (error) {
    console.error("Failed to load tasks:", error);
    return json({ tasks: [], username });
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const token = await requireUserSession(request);
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case "create": {
      const title = formData.get("title");
      if (typeof title !== "string" || !title.trim()) {
        return json({ error: "タイトルを入力してください" }, { status: 400 });
      }
      try {
        await createTask(title, token);
        return redirect("/tasks");
      } catch (error) {
        return json({ error: "タスクの追加に失敗しました" }, { status: 500 });
      }
    }

    case "delete": {
      const taskId = formData.get("taskId");
      if (typeof taskId !== "string") {
        return json({ error: "タスクIDが必要です" }, { status: 400 });
      }
      try {
        await deleteTask(parseInt(taskId), token);
        return redirect("/tasks");
      } catch (error) {
        return json({ error: "タスクの削除に失敗しました" }, { status: 500 });
      }
    }

    case "logout": {
      return logout(request);
    }

    default:
      return json({ error: "無効なアクション" }, { status: 400 });
  }
}

export default function TasksIndex() {
  const { tasks, username } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  
  const isSubmitting = navigation.state === "submitting";

  return (
    <div>
      <UserInfo username={username} />
      
      <TaskForm isSubmitting={isSubmitting} />
      
      <div>
        <h2>タスク一覧</h2>
        {tasks.length === 0 ? (
          <p>タスクがありません。</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
              />
            ))}
          </ul>
        )}
      </div>
      
      <Form method="post">
        <input type="hidden" name="intent" value="logout" />
        <button type="submit">ログアウト</button>
      </Form>
    </div>
  );
}