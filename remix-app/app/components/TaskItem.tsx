import { useFetcher } from "@remix-run/react";

interface TaskItemProps {
  task: {
    id: number;
    title: string;
  };
}

export function TaskItem({ task }: TaskItemProps) {
  const deleteFetcher = useFetcher();
  
  const isDeleting = deleteFetcher.state === "submitting" &&
    deleteFetcher.formData?.get("taskId") === task.id.toString();

  return (
    <li>
      {task.title}
      <span>
        <deleteFetcher.Form method="post" style={{ display: 'inline' }}>
          <input type="hidden" name="intent" value="delete" />
          <input type="hidden" name="taskId" value={task.id} />
          <button
            type="submit"
            style={{ marginLeft: '10px' }}
            disabled={isDeleting}
          >
            {isDeleting ? '削除中...' : '削除'}
          </button>
        </deleteFetcher.Form>
      </span>
    </li>
  );
}