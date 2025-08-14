# React Remix FastAPI フルスタックアプリケーション

React と Remix の両方のフロントエンドと FastAPI バックエンドを備えたモダンなフルスタックアプリケーション。

## 🎯 概要

このプロジェクトは以下の技術を使用したフルスタックアーキテクチャを実装しています：

- **バックエンド**: JWT 認証を実装した FastAPI
- **フロントエンド（選択可能）**:
  - React + Vite（従来の SPA）
  - Remix（モダンな SSR フレームワーク）
- **データベース**: SQLModel ORM を使用した SQLite
- **認証システム**: JWT ベースの認証

## 📁 プロジェクト構造

```
.
├── api-server/           # FastAPIバックエンド
│   ├── main.py          # メインAPIアプリケーション
│   ├── database.db      # SQLiteデータベース
│   └── test_main.py     # APIテスト
├── react-app/           # React + Viteフロントエンド
│   ├── src/
│   │   ├── App.tsx      # メインアプリコンポーネント
│   │   ├── Context.tsx  # グローバルコンテキスト
│   │   ├── Login.tsx    # ログインコンポーネント
│   │   ├── TaskList.tsx # タスクリストコンポーネント
│   │   ├── TaskAdd.tsx  # タスク追加コンポーネント
│   │   ├── TaskDelete.tsx # タスク削除コンポーネント
│   │   └── main.tsx     # エントリーポイント
│   └── package.json
└── remix-app/           # Remixフロントエンド
    ├── app/
    │   ├── routes/      # Remixルート
    │   │   ├── _index.tsx
    │   │   ├── login.tsx
    │   │   └── tasks.tsx
    │   ├── lib/         # サーバーユーティリティ
    │   │   ├── api.server.ts
    │   │   └── auth.server.ts
    │   ├── components/  # 共通コンポーネント
    │   │   ├── TaskForm.tsx
    │   │   ├── TaskItem.tsx
    │   │   └── UserInfo.tsx
    │   └── styles/      # グローバルスタイル
    │       └── global.css
    └── package.json
```

## 🚀 はじめに

### 必要な環境

- Node.js 18+ および npm
- Python 3.9+
- pip（Python パッケージマネージャー）

### バックエンドのセットアップ

1. バックエンドディレクトリに移動:

```bash
cd api-server
```

2. 仮想環境を作成:

```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

3. 依存関係をインストール:

```bash
pip install fastapi uvicorn sqlmodel python-jose[cryptography] python-multipart
```

4. FastAPI サーバーを起動:

```bash
uvicorn main:app --reload --port 8000
```

API は `http://localhost:8000` で利用可能
API ドキュメント: `http://localhost:8000/docs`

### フロントエンドのセットアップ（React + Vite）

1. フロントエンドディレクトリに移動:

```bash
cd react-app
```

2. 依存関係をインストール:

```bash
npm install
```

3. 開発サーバーを起動:

```bash
npm run dev
```

React アプリは `http://localhost:5173` で利用可能

### フロントエンドのセットアップ（Remix）

1. Remix フロントエンドディレクトリに移動:

```bash
cd remix-app
```

2. 依存関係をインストール:

```bash
npm install
```

3. 開発サーバーを起動:

```bash
npm run dev
```

Remix アプリは `http://localhost:5174` で利用可能

## 🔐 認証

アプリケーションは JWT 認証を使用しています。以下のテストユーザーでログインできます：

| ユーザー名 | パスワード    | 説明             |
| ---------- | ------------- | ---------------- |
| `alice`    | `password123` | テストユーザー 1 |
| `bob`      | `secret`      | テストユーザー 2 |

ログイン後は以下の機能が利用可能です：

- タスクの一覧表示
- 新規タスクの作成
- タスクの完了/未完了の切り替え
- タスクの編集・更新
- タスクの削除
- ユーザー情報の取得

## 🛠️ 利用可能なスクリプト

### バックエンド

- `uvicorn main:app --reload`: 開発サーバーを起動
- `pytest test_main.py`: テストを実行

### フロントエンド（React）

- `npm run dev`: 開発サーバーを起動
- `npm run build`: プロダクションビルド
- `npm run lint`: ESLint を実行
- `npm run preview`: プロダクションビルドをプレビュー

### フロントエンド（Remix）

- `npm run dev`: 開発サーバーを起動
- `npm run build`: プロダクションビルド
- `npm run start`: プロダクションサーバーを起動
- `npm run typecheck`: TypeScript 型チェック
- `npm run lint`: ESLint を実行

## 📦 技術スタック

### バックエンド

- **FastAPI**: 高速でモダンな API 構築用フレームワーク
- **SQLModel**: SQLAlchemy と Pydantic をベースにした SQL ORM
- **python-jose**: JWT トークン処理
- **Uvicorn**: ASGI サーバー

### フロントエンド（React）

- **React 19**: 最新の React バージョン
- **Vite**: 次世代フロントエンドツール
- **TypeScript**: 型安全な JavaScript
- **ESLint**: コード品質と一貫性

### フロントエンド（Remix）

- **Remix**: フルスタック Web フレームワーク
- **React 18**: UI ライブラリ
- **TypeScript**: 型安全性
- **Tailwind CSS**: ユーティリティファースト CSS フレームワーク

## 🔄 API エンドポイント

cd

- `POST /login`: ユーザー認証
- `GET /me`: 現在のユーザー情報を取得
- `GET /tasks`: すべてのタスクを取得（認証必須）
- `POST /tasks`: 新しいタスクを作成（認証必須）
- `PUT /tasks/{id}`: タスクを更新（認証必須）
- `DELETE /tasks/{id}`: タスクを削除（認証必須）

## 🚢 デプロイ

### バックエンド

1. プロダクション用の環境変数を設定
2. プロダクション ASGI サーバーを使用（例：Uvicorn ワーカーで Gunicorn）
3. 適切な CORS オリジンを設定

### フロントエンド（React）

1. プロダクションバンドルをビルド:
   ```bash
   npm run build
   ```
2. `dist`フォルダを静的ファイルサーバーでサーブ

### フロントエンド（Remix）

1. プロダクション用にビルド:
   ```bash
   npm run build
   ```
2. プロダクションサーバーを起動:
   ```bash
   npm run start
   ```
