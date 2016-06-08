### API Basejump: File MetaData Microservice
---

#### User stories:

* I can submit a FormData object that includes a file upload.

* When I submit something, I will receive the file size in bytes within the JSON response


##### Example Output:

```javascript
	[
	 {
	  "filename": "amplidudes-ui.png",
	  "filesize": 858695,
	  "filesizeInKB": "838.57KB",
	  "filetype": "image/png",
	  "url": "http://localhost:3000/uploads/amplidudes-ui.png"
	 }
	]
	
```
---

##### UI:

![header-parser-ui](https://res.cloudinary.com/vinaypuppal/image/upload/v1465395641/file-metadata-ui_vxltxf.png )

---

#### How To Run This App Locally

Clone This Repoistory
```bash
git clone https://github.com/vinaypuppal/file-metadata.git
```

```bash
cd <cloned directory>
```

Install dependencies and start server
```bash
npm install
npm run dev
```
