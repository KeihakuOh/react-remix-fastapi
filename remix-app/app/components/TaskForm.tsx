import { Form } from "@remix-run/react";

interface TaskFormProps {
  isSubmitting: boolean;
}

export function TaskForm({ isSubmitting }: TaskFormProps) {
  return (
    <div>
      <h2>新しいタスクを追加</h2>
      <Form method="post">
        <input type="hidden" name="intent" value="create" />
        <input name="title" required placeholder="タスクを入力してください" />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '追加中...' : '追加'}
        </button>
      </Form>
    </div>
  );
}