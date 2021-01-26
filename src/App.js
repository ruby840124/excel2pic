import React from 'react';
import XLSX from "xlsx";
import { Accordion, Card, Button } from 'react-bootstrap';
import InputFiles from "react-input-files";
import 'bootstrap/dist/css/bootstrap.min.css';
import PreviewImg from './PreviewImg';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      ratio: 2,
      canvasWidth: 800, 
      canvasHeight: 600,
      bgImg: null, 
      excelData: null,
      excelTitleData: null,
      excelHint: false,
      bgImgHint: false
    };
  }

  //匯入excel檔案
  onImportExcel = files => {
    const fileReader = new FileReader();
    for (let index = 0; index < files.length; index++) {
        fileReader.name = files[index].name;
    }
    fileReader.onload = event => {
        try {
            const validExts = [".xlsx", ".xls"];
            const fileExt = event.target.name;

            const fileExtlastof = fileExt.substring(fileExt.lastIndexOf("."));
            if (validExts.indexOf(fileExtlastof) === -1) 
              throw new Error("檔案類型錯誤，只可接受：" + validExts.toString() + "檔案名稱");

            const { result } = event.target;
            const workbook = XLSX.read(result, { type: "binary" });
            let data = []; 
            for (const sheet in workbook.Sheets) {
                if (workbook.Sheets.hasOwnProperty(sheet)) {
                    data = data.concat(
                        XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
                    );
                }
            }

            if(data.length === 0) 
              throw new Error("excel沒有任何資料");

            this.setState({excelHint: false});
            this.getExcelTitle(data);
        } catch (e) {
          alert(e);
          return;
        }
    };
    fileReader.readAsBinaryString(files[0]);
  };

  //取得excel欄位所有標題
  getExcelTitle = (data) => {
    let titleArray = [];
    for (var key in data[0])
        titleArray.push(key);
    console.log(titleArray);
    this.setState({excelData: data, excelTitleData: titleArray});
  }

  //匯入圖片檔案
  handleImageChange = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
        const img = new window.Image();
        img.onload = () => {
          this.setState({bgImgHint: false});
          console.log("loading");
        }
        img.src = reader.result;
        this.setState({bgImg: reader.result});
    }
    reader.readAsDataURL(file);
  }

  changeRatio = () => {
    const value = document.getElementById("bgRatio").value;
    if(value === "small"){
      this.setState({ratio: 2});
    }else if(value === "middle"){
      this.setState({ratio: 1.8});
    }else if(value === "big"){
      this.setState({ratio: 1.6});
    }
  }

  download = () =>{
    const {stage} = this.state;
    const a = document.createElement('a');
    const event = new MouseEvent('click');
    a.download = 'test.jpg';
    a.href = stage.toDataURL();
    a.dispatchEvent(event);
  }

  updatePreviewImg = () => {
    const {bgImg, excelData} = this.state;
    if(!bgImg && !excelData){
      alert("請上傳背景圖&excel檔案");
      this.setState({excelHint: true, bgImgHint: true});
    }else if(!bgImg){
      alert("請上傳背景圖");
      this.setState({bgImgHint: true});
    }else if(!excelData){
      alert("請上傳excel檔案");
      this.setState({excelHint: true});
    }
  }

  render() {
    const {canvasWidth, canvasHeight, excelHint, bgImgHint, ratio} = this.state;
    return (
      <div className="App">
        <div className="topBlock">
          <div className="topText">excel2picture demo</div>
        </div>
        <div className="cotentBlock">
          <div className="uploadBlock">
            <div className="uploadBgBlock" id="uploadBgBlock">
              <div style={{width: "80%", marginTop: "20px", fontFamily: "sans-serif"}}>
              <Accordion defaultActiveKey="0">
                <Card>
                  <Accordion.Toggle as={Card.Header} style={{fontWeight: "bold", color: "#0066CC"}} eventKey="0">
                    step 1 : 選擇預覽圖片大小
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <select id="bgRatio" onChange={this.changeRatio}>
                  　        <option value="small">small</option>
                  　        <option value="middle">middle</option>
                            <option value="big">big</option>
                        </select>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Accordion.Toggle as={Card.Header} style={{fontWeight: "bold", color: excelHint? "red":"#0066CC"}} eventKey="1">
                    step 2 : 上傳excel檔案
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        <InputFiles accept=".xlsx, .xls" onChange={this.onImportExcel}>
                            <button className="btn btn-primary">上傳excel資料</button>
                        </InputFiles>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Accordion.Toggle as={Card.Header} style={{fontWeight: "bold", color: bgImgHint? "red":"#0066CC"}} eventKey="2">
                    step 3 : 上傳背景圖片
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="2">
                    <Card.Body>
                    <label className="btn btn-primary" style={{marginBottom: "0"}}>
                        {"上傳背景圖片"}
                        <input type="file" style={{display: "none"}} onChange={this.handleImageChange} accept="image/*"/>
                    </label>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
              <Button variant="info" style={{width: "100%", marginTop: "10px"}} onClick={this.updatePreviewImg}>產生預覽結果</Button>{' '}
              </div>
              <PreviewImg canvasWidth={canvasWidth/ratio} canvasHeight={canvasHeight/ratio}/>
            </div>
            <div className="generateImageBlock">
              {"請先選擇資料及圖片，並預覽結果"}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
