Project Idea:
Agriculture theme based fullstack app that shares information about seasonal/regional prduce based on user's choice of date/region, and keeps track of user entried data in a dashboard.

Tech Stack: 
Next.js , heroicons, lucide, Typescript, Tailwind CSS, Redux Toolkit, Prisma.

Notes:
This project is currently in development stage. Translations (En/Tur) and UI are not yet finished.
Feel free to check it out and give opinions however! All interactions are welcomed. Thank you.

Launch The Repo On Your Machine
1) Clone The Repo
 / On your termminal:
   git clone <REPO_URL>
   cd <REPO_FOLDER_NAME>
   
2) Install dependencies
   npm install

3) Set up environment variables and database
  * do not forget to remove comments *
    cp .env.example .env

5) npx prisma db push
   npx prisma generate
   npx prisma migrate dev --name init

6) Run the development server.
   npm run dev

{-- 6) To start an actual server:
   npm run build, then, npm run start --}

 
