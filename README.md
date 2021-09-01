# Chegg App

This is a sample interface utilizing [Github REST APIs](https://docs.github.com/en/rest/reference/repos).

## Installation / Usage
Chegg App requires [Node](https://nodejs.org/en/) >= 10.14.2 and [npm](https://www.npmjs.com/) >=6.14.11 for installation. If you use an older version you can use [Node Version Manager](https://github.com/creationix/nvm) to install the required version of `Node` and switch between them.

```sh
nvm install 10.14.2
nvm use 10.14.2
```

After the correct node version is installed, you can proceed with the following

```sh
git clone https://github.com/alberthuynh91/chegg-app.git
cd chegg-app
yarn install
```

## Usage
```sh
yarn dev
```

Then in your browser, navigate to
```sh
http://localhost:3000/
```

Note: Currently this app is defaulted to `alberthuynh91` for the `{username}` so all repositories will be loaded for this user. If you would like to load your own `{username}` add `?username=username` to the path in the browser e.g. `http://localhost:3000/?username=reactjs`

## Testing
```sh
yarn test
```

## Additional Improvements
1) Add React Drag and Drop for reordering of Issues
2) Clean up styling
3) Add click through links to profile, issue, or repository
4) Add additional unit tests to test the handlers and mock API calls
5) Heroku Deployment