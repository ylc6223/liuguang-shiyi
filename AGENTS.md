# Repository Guidelines

## Communication

- 永远使用简体中文进行思考和对话,输出的文档文字说明保持使用简体中文

## Project Structure & Module Organization
- Source code: place runtime code in `src/` (e.g., `src/index.ts` or `src/main.js`).
- Tests: keep unit tests in `tests/` mirroring `src/` paths (e.g., `src/utils/date.ts` → `tests/utils/date.test.ts`).
- Assets: store static files in `public/` or `assets/`.
- Scripts & tooling: put local scripts in `scripts/`; environment examples in `.env.example`.

## Build, Test, and Development Commands
- Development: `npm run dev` (or `yarn dev` / `pnpm dev`) — starts a local dev server or watcher if configured.
- Build: `npm run build` — produces a production build into `dist/`.
- Test: `npm test` — runs the unit test suite.
- Lint: `npm run lint` — checks code style and common issues.
- Format: `npm run format` — applies auto-formatting.

If a command is missing, add the corresponding script in `package.json`.

## Coding Style & Naming Conventions
- Formatting: 2-space indentation; max line length 100; run Prettier before commit.
- Linting: ESLint with the recommended rules; fix warnings before opening PRs.
- Naming: use `camelCase` for variables/functions, `PascalCase` for React/components/classes, `SCREAMING_SNAKE_CASE` for constants.
- Files: `kebab-case` for filenames (e.g., `date-utils.ts`). Export a single default only when it improves ergonomics.

## Testing Guidelines
- Framework: Jest or Vitest (keep tests fast and isolated).
- Location: mirror `src/` in `tests/`; name files `*.test.ts`/`*.test.js`.
- Coverage: aim for meaningful coverage on core logic; avoid brittle UI snapshots.
- Run locally with `npm test` and in watch mode via `npm test -- --watch`.

## Commit & Pull Request Guidelines
- Commits: follow Conventional Commits. Examples:
  - `feat(api): add pagination to list route`
  - `fix(ui): prevent modal focus trap leak`
- PRs: include a clear description, linked issues (e.g., `Closes #123`), screenshots for UI changes, and notes on testing/impact.
- CI: ensure lint, build, and tests pass before requesting review.

## Security & Configuration Tips
- Never commit secrets. Use `.env.local` and provide safe defaults in `.env.example`.
- Review dependencies periodically; prefer audited, well-maintained libraries.
- Least privilege for tokens/keys used in local or CI environments.

## Documentation

- 编写 .md 文档时，也要用中文
- 正式文档写到项目的 docs/ 目录下
- 用于讨论和评审的计划、方案等文档，写到项目的 discuss/ 目录下

## Code Architecture

- 编写代码的硬性指标，包括以下原则：（1）对于 Python、JavaScript、TypeScript 等动态语言，尽可能确保每个代码文件不要超过 300 行（2）对于 Java、Go、Rust 等静态语言，尽可能确保每个代码文件不要超过 400 行（3）每层文件夹中的文件，尽可能不超过 8 个。如有超过，需要规划为多层子文件夹
- 在生成代码时，请严格使用枚举类型来表示所有固定的状态、类别或选项，枚举成员必须绑定为 数字常量。不允许直接写字符串或裸数字,必须通过枚举成员引用,如果函数或数据结构涉及这些值，类型必须是该枚举，而不是 number 或 string。示例如下:

```aiignore
enum OrderStatus {
  Pending = 1,
  Paid = 2,
  Cancelled = 3
}

function updateOrderStatus(status: OrderStatus) {
  if (status === OrderStatus.Paid) {
    console.log("订单已支付");
  }
}

```

- 除了硬性指标以外，还需要时刻关注优雅的架构设计，避免出现以下可能侵蚀我们代码质量的「坏味道」：（1）僵化 (Rigidity): 系统难以变更，任何微小的改动都会引发一连串的连锁修改。（2）冗余 (Redundancy): 同样的代码逻辑在多处重复出现，导致维护困难且容易产生不一致。（3）循环依赖 (Circular Dependency): 两个或多个模块互相纠缠，形成无法解耦的“死结”，导致难以测试与复用。（4）脆弱性 (Fragility): 对代码一处的修改，导致了系统中其他看似无关部分功能的意外损坏。（5）晦涩性 (Obscurity): 代码意图不明，结构混乱，导致阅读者难以理解其功能和设计。（6）数据泥团 (Data Clump): 多个数据项总是一起出现在不同方法的参数中，暗示着它们应该被组合成一个独立的对象。（7）不必要的复杂性 (Needless Complexity): 用“杀牛刀”去解决“杀鸡”的问题，过度设计使系统变得臃肿且难以理解。
- 【非常重要！！】无论是你自己编写代码，还是阅读或审核他人代码时，都要严格遵守上述硬性指标，以及时刻关注优雅的架构设计。
- 【非常重要！！】无论何时，一旦你识别出那些可能侵蚀我们代码质量的「坏味道」，都应当立即询问用户是否需要优化，并给出合理的优化建议。
