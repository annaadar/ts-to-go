# ts-to-go

Converts TypeScript types to Go structs using the TypeScript Compiler API.

```bash
npx tsx src/index.ts examples/models.ts > models.go
```

---

## Why

Keeping TypeScript interfaces and Go structs in sync is fine until someone adds a field and forgets to update the other side. This generates your Go types from TypeScript so that can't happen.
Built on the TypeScript Compiler API, so it resolves types the way the compiler does, and not by reading text.

---

## What it handles

| TypeScript | Go |
|---|---|
| `string` | `string` |
| `number` | `float64` |
| `boolean` | `bool` |
| `string \| null` | `*string` |
| `string[]` / `Array<T>` | `[]T` |
| `Record<K, V>` | `map[K]V` |
| `Date` | `time.Time` |
| Optional fields `?` | pointer + `omitempty` |
| String enums | typed `string` constants |
| Numeric enums | typed `int` constants |
| Double/Float enums | typed `float64` constants |

---

## Example

Input:

```typescript
interface User {
  id: string;
  age: number;
  email: string | null;
  roles: string[];
  address?: Address;
  createdAt: Date;
}

interface Address {
  street: string;
  city: string;
}

enum Status {
  Active = "active",
  Inactive = "inactive",
}
```

Output:

```go
package models

import "time"

type Status string

const (
	StatusActive   Status = "active"
	StatusInactive Status = "inactive"
)

type User struct {
	Id        string    `json:"id"`
	Age       float64   `json:"age"`
	Email     *string   `json:"email"`
	Roles     []string  `json:"roles"`
	Address   *Address  `json:"address,omitempty"`
	CreatedAt time.Time `json:"createdAt"`
}

type Address struct {
	Street string `json:"street"`
	City   string `json:"city"`
}
```

---

## Setup

```bash
git clone https://github.com/your-username/ts-to-go
cd ts-to-go
pnpm install
```

```bash
npx tsx src/index.ts path/to/models.ts > models.go
```

Multiple files:

```bash
npx tsx src/index.ts src/types/*.ts > models.go
```

---

## How it works

The TypeScript Compiler API gives you a full program object - type checker included. From there:

1. `parser.ts` - creates a `ts.Program` from your files
2. `extractor.ts` - walks the AST with `ts.forEachChild`, finds interface/type/enum declarations
3. `mapper.ts` - converts each `ts.TypeNode` to a Go type string using the type checker for accurate symbol resolution
4. `emitter.ts` - renders the collected types as Go source


---

## Limitations

- Union types beyond `T | null` / `T | undefined` become `interface{}`

- Function signatures in interfaces are skipped
- Mapped types and conditional types are not supported

---

## License

MIT