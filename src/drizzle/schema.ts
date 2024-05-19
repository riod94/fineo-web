import { text, timestamp, pgTable, boolean, date, doublePrecision, pgEnum, bigserial, bigint } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: bigserial("id", { mode: 'bigint' }).primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const todos = pgTable("todos", {
    id: bigserial("id", { mode: 'bigint' }).primaryKey(),
    userId: bigint("user_id", { mode: 'bigint' }).references(() => users.id),
    title: text("title").notNull(),
    content: text("description"),
    isCompleted: boolean("is_completed").default(false),
    date: date("date"),
    dueDate: date("due_date"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
})

export const transactionCategories = pgTable("transaction_categories", {
    id: bigserial("id", { mode: 'bigint' }).primaryKey(),
    userId: bigint("user_id", { mode: 'bigint' }).references(() => users.id),
    name: text("name").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
})

export const wallets = pgTable("wallets", {
    id: bigserial("id", { mode: 'bigint' }).primaryKey(),
    userId: bigint("user_id", { mode: 'bigint' }).references(() => users.id),
    name: text("name").notNull(),
    balance: doublePrecision("balance").notNull().default(0),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
})

export const transactionTypeEnum = pgEnum("type", ["income", "expense"])

export const transactions = pgTable("transactions", {
    id: bigserial("id", { mode: 'bigint' }).primaryKey(),
    userId: bigint("user_id", { mode: 'bigint' }).references(() => users.id),
    walletId: bigint("wallet_id", { mode: 'bigint' }).references(() => wallets.id),
    category: text("category").notNull(),
    type: transactionTypeEnum("type").default("expense"),
    content: text("content").notNull(),
    amount: doublePrecision("amount").notNull().default(0),
    date: date("date").notNull(),
    startDate: date("start_date"),
    dueDate: date("due_date"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
})