import React, {useState, useEffect, useRef} from 'react'
import close from '../assets/times-circle-regular.svg'
import './token.css'
import { NFTStorage } from 'nft.storage'
import { mint } from '../utils/api'
import BigNumber from 'bignumber.js';
import axios from 'axios'
import { Redirect } from 'react-router-dom'

function Token() {
    const [preview, setPreview] = useState()
    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false)
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [isUploading, setIsUploading] = useState(false)
    const [price, setPrice] = useState()
    const [redirect, setRedirect] = useState(false)
    const [presentCategories, setPresentCategories] = useState([]);

    const nameWarning = useRef()
    const descriptionWarning = useRef()
    const createTokenButton = useRef()
    const tokenPrice = useRef()

    const getCategories = async () => {
        const resp = await axios.get("http://localhost:8080/api/categories/")
        console.log("the categories are :", resp.data)
        setPresentCategories([...resp.data])
    }


    useEffect(() => {
        getCategories()
    }, [])
    

    const removeFile = () => {
        setIsFilePicked(false)
        URL.revokeObjectURL(preview)
        setSelectedFile({})
        setPreview()
    }

    const fileUploadHandler = (event) => {
		setSelectedFile(event.target.files[0]);
        setPreview(URL.createObjectURL(event.target.files[0]))
		setIsFilePicked(true);
	};

    const handleNftValue = (e) => {
        var decimal=  /^[0-9]+\.[0-9]+?$/
        if(e.target.value.match(decimal) && parseFloat(e.target.value) > 0 ){
            setPrice(e.target.value)
            tokenPrice.current.value = e.target.value
        } else if(isNaN(e.target.value)) {
            tokenPrice.current.value = 0
        }
    }

    const createTokenHandler = async () => {
        if(title !== undefined){
            if(title.length > 0) {
                nameWarning.current.style.display = 'none'
            } else if(title.length === 0) {
                nameWarning.current.style.display = 'block'
                return
            }
        }

        if(description !== undefined){
            if(description.length > 0) {
                descriptionWarning.current.style.display = 'none'
            } else if(description.length === 0) {
                descriptionWarning.current.style.display = 'block'
                return
            }
        }

        if(isFilePicked && !isUploading){
            try{
                setIsUploading(true)
                const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDZlODU3RmU3NzE0NWI2QWUyNzdCOEUxRTM1MjJkMGM3ZmYwQTMzMDciLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyOTgyNzM2MTgwMCwibmFtZSI6Ik5GVCBUaWNrZXQifQ.2boSMhzE1hicA0AKfVVm4D6KfJma4M9w71-IE1jnJxM'
                const client = new NFTStorage({ token: apiKey })

                const metadata = await client.store({
                  name: title,
                  description: description,
                  image: selectedFile,
                })
                console.log(metadata.url)
                console.log(metadata.data)

                let val = parseFloat(price);
                val = val * 1e18;
                let bigPrice = new BigNumber(val)
                await mint(metadata.url, bigPrice.toString())
                setIsUploading(false)
                removeFile();
                setTitle("")
                setDescription("")
                setRedirect(true)
            } catch (err) {
                console.log("we got a error :", err)
                setIsUploading(false)
                removeFile();
                setTitle("")
                setDescription("")
                removeFile();
                setIsFilePicked(false)
                createTokenButton.current.innerText = "Failed"
                createTokenButton.current.style.background = "#e92727"
            }
        }
    }

    useEffect(() => {
        if(title !== undefined){
            if(title.length > 0) {
                nameWarning.current.style.display = 'none'
            } else if(title.length === 0) {
                nameWarning.current.style.display = 'block'
                return
            }
        }

        if(description !== undefined){
            if(description.length > 0) {
                descriptionWarning.current.style.display = 'none'
            } else if(description.length === 0) {
                descriptionWarning.current.style.display = 'block'
                return
            }
        }

    }, [title, description])

    const isLoading = () => {
            return (
                <div class="spinner mt-4" style={{height: '100%'}}>
                    <div class="d-flex justify-content-center">
                      <div class="spinner-border text-white" role="status">
                      </div>
                    </div> 
                </div>        
            )
     }

     const shouldRedirect = redirect => {
        if (redirect) {
          return <Redirect to="/" />;
        }
      };

    return (
        <div className="create-token-container">
            <h1 className="mt-4 text-center">Mint Ticket</h1>
            <small className="text-danger">*Only Admin can mint tickets*</small>
            {isUploading === true ? isLoading() : 
              <>
              {shouldRedirect(redirect)}
                 <div className="file-upload-container">
                <h2>Upload File</h2>
                <div className="file-upload">
                    {
                        (preview && isFilePicked) ?
                        <div className="preview-image">
                            <img src={preview} alt="preview" />
                            <img src={close} className="close" onClick={removeFile} alt="close" />
                        </div> :
                        <>
                            <input required type="file" id="file-input" name="file" accept=".jpg,.png,.gif,.mp4" className="custom-file-input" onChange={fileUploadHandler} />
                            <p>{ isFilePicked && selectedFile.name}</p>
                            <p>PNG, JPG, GIF, MP4</p>
                            <label htmlFor="file-input">
                                <p>Choose file</p>
                            </label>
                        </>
                    }
                </div>
            </div>

            <div className="token-info">
                <div className="token-info-input">
                    <label>Title</label>
                    <input required type="text" value={title} onChange={(e) => {setTitle(e.target.value)}} />
                    <p className="input-warning" ref={nameWarning}>* Enter Title</p>
                </div>
                <div className="token-info-input">
                    <label>Event Category</label>
                    {/* <input type="text" value={description} onChange={(e) => {setDescription(e.target.value)}} /> */}
                    <select required value={description} style={{marginTop: '20px'}} onChange={(e) => {setDescription(e.target.value)}}>
                        <option>Please Select</option>
                        {
                            presentCategories.length > 0 && presentCategories.map((categ) => {
                                return(
                                    <option value={categ.name}>{categ.name}</option>
                                )
                            })
                        }
                    </select>
                    <p className="input-warning" ref={descriptionWarning}>* Select Event</p>
                </div>
                <div className="token-info-input">
                    <label>Price</label>
                    <input type="number" ref={tokenPrice} onChange={handleNftValue}  />
                    <p className="input-warning" style={{color: '#c5a86d'}} >* Service Fee 10%</p>
                </div>
            </div>

            <div className="create-token-button" ref={createTokenButton} onClick={createTokenHandler} >
                <p>Mint</p>
            </div>
              </>
            }
        </div>
    )
}

export default Token
