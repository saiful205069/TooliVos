import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "database.json");

export interface SupportTicket {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  status: "unread" | "read" | "resolved";
}

export interface UserLogin {
  id: string;
  email: string;
  method: string;
  timestamp: string;
}

export interface SystemNotification {
  id: string;
  type: "support" | "login" | "system";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface Database {
  supportTickets: SupportTicket[];
  userLogins: UserLogin[];
  notifications: SystemNotification[];
  subscriptions: { id: string, email: string, timestamp: string }[];
  stats: {
    activeUsers: number;
    todaysChecks: number;
  };
}

const defaultDb: Database = {
  supportTickets: [],
  userLogins: [],
  notifications: [],
  subscriptions: [],
  stats: {
    activeUsers: 0,
    todaysChecks: 0,
  },
};

export function getDb(): Database {
  if (!fs.existsSync(dbPath)) {
    if (!fs.existsSync(path.dirname(dbPath))) {
        fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    }
    fs.writeFileSync(dbPath, JSON.stringify(defaultDb, null, 2), "utf8");
    return defaultDb;
  }
  try {
    const data = fs.readFileSync(dbPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return defaultDb;
  }
}

export function saveDb(data: Database) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf8");
}
