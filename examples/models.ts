interface User {
  id: string;
  age: number;
  email: string | null;
  isActive: boolean;
  roles: string[];
  address?: Address;
}

interface Address {
  street: string;
  city: string;
  zip: string;
}
enum Status {
  Active = "active",
  Inactive = "inactive",
}
enum Prices {
  Price1=5.4,
  Price2=2.2
}
interface Config {
  settings: Record<string, boolean>;
  scores: Record<string, number>;
  lookup: Record<string, User>;
}
interface Generic<T> {
  data:T;
}
