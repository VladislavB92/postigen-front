# POSTIGEN-FRONT

## PROJECT

The Postigen-front is a simple parcel movement application front-end.
The back-end API solution you can find [here](https://github.com/VladislavB92/postigen/blob/main/README.md).
![postigen-1.png](..%2Fpostigen-1.png)
![postigen-2.png](..%2Fpostigen-2.png)
![postigen-3.png](..%2Fpostigen-3.png)
![postigen-4.png](..%2Fpostigen-4.png)

It allows:

    - the user to browse parcels, lockers and customers
    - put the parcels in the locker;
    - move the parcels between lockers;
    - take out the parcel from the locker.

## TECHNOLOGY

- The project is based on `React v18.2.0` and `TypeScript`.

## DEVELOPMENT

### Installation (MacOS/Linux)

1. Install Node package manager (NPM) dependencies.
   Ensure that NPM binaries have been installed on your machine.

        `npm install`

2. Launch the development server.

        `npm start`

3. Locate the .env file and fill your [back-end's](https://github.com/VladislavB92/postigen/blob/main/README.md)
   localhost IP for the `REACT_APP_BASE_API_URL` key. By default, it should be `http://localhost:8000`.

## GIT

1. Each new branch should be created from the `main` branch.

2. For the branch naming, start each branch name with the prefix according to the work you intend to do in it:

    - feature/
    - bugfix/

3. For the merge request, target the working branch to the `master` branch.