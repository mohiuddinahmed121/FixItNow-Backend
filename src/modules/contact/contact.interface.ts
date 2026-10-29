export interface ICreateContactMessage {
   name: string;
   email: string;
   subject: string;
   message: string;
   // Honeypot field: real visitors leave it empty
   website?: string;
}
