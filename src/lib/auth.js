import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("assignment-10");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      mapProfileToUser: (profile) => {
        return {
          role: "tenant",
        };
      },
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "tenant",
        input: true,
      },
    },
  },
  advanced: {
    disableCSRFCheck: true,
  },
});







// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";
// import { admin } from "better-auth/plugins";

// const client = new MongoClient(process.env.MONGODB_URI);
// const db = client.db("assignment-10");

// export const auth = betterAuth({
//   database: mongodbAdapter(db, {
//     // Optional: if you don't provide a client, database transactions won't be enabled.
//     client
//   }),
//     emailAndPassword: { 
//     enabled: true, 
//   }, 
//   socialProviders: {
//     google: {
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       // Intercept profile to map custom role fields
//       mapProfileToUser: (profile) => {
//         return {
//           role: "tenant", 
//         };
//       },
//     },
//   },
//   user: {
//     additionalFields: {
//       role: {
//         type: "string",
//         required: false,
//         defaultValue: "tenant",
//       },
//     },
//   },
//   plugins:[
//     admin()
//   ],
//   advanced:{
//     disableOriginCheck:true
//   }
//   // session:{
//   //   cookieCache:{
//   //     enabled: true,
//   //     strategy: "jwt",
//   //     maxAge: 60 * 24 * 30
//   //   }
//   // },
//   // plugins:[
//   //   jwt()
//   // ]
// });