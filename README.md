## Github Repo Search Engine

[app link](http://yanglin-dcard.herokuapp.com/)

### development

```
yarn install
yarn start
```
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

run `yarn lint --fix` to lint the file.

### deploy to production

simply git commit & push to master branch.

### file architecture

```
src
├── App.js
├── components      // reusable components, each component is in a individual folder
├── context         // shared context logic
├── index.js        // entry point
└── utils           // shared module/function/hooks
```