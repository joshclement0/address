# address-book


## Project Setup

```sh
docker-compose up
```

frontend: 
```sh
localhost:8200
```
backend:
```sh
localhost:8000
```
database:
```sh
localhost:8100
```

## Development
### Frontend
```sh
cd web
npm install
```
```sh
npm run dev
```
### Backend
```sh
cd server
python -m pip install requirements.txt
```
Depending on python version you may have to run
```sh
python3 -m pip install requirements.txt
```
To run the backend separately you will need to add to src/app.py
```sh
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0',port=port)
 ```
 Afterwhich you can run:
 ```sh
 python src/app.py
 ```
