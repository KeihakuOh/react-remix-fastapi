interface UserInfoProps {
  username: string;
}

export function UserInfo({ username }: UserInfoProps) {
  return <p>ログイン中: {username}さん</p>;
}