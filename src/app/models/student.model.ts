import { transaction } from "./transaction.model";

export interface student {
  username: string
  budget: number
  classCode: number
  theme: string
  transactions: transaction[]
}
