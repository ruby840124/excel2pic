import React, { Component } from 'react';
import Konva from 'konva';
import { Image } from 'react-konva';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      image: null,
      imageUrl: '',
      stage: null, 
      canvasWidth: 250, 
      canvasHeight: 250, 
      boxArray:['診所名稱', '評論者', '評論']};
  }

  componentDidMount(){
    this.initStage();
  }

  initStage = () => {
    const {canvasWidth, canvasHeight} = this.state;
    const stage = new Konva.Stage({
      x:0,
      y:0,
      container: 'container',
      width: canvasWidth,
      height: canvasHeight,
    });
    for (let i = 0; i < 3; i++) {
      this.addBox(stage, i);
    }
  }

  addBox = (stage, i) => {
    const {canvasWidth, boxArray} = this.state;
    const layer = new Konva.Layer();
    const box = new Konva.Group({
        Zindex: 10,
        x: canvasWidth / 2 - 50,
        y: 10 + i*40,
        width: 100,
        height: 25,
        fill: '#00D2FF',
        stroke: 'black',
        strokeWidth: 4,
        draggable: true,
    });

    box.add(new Konva.Rect({
      width: 100,
      height: 25,
      fill: 'lightblue'
    }));

    box.add(new Konva.Text({
      text: boxArray[i],
      fontSize: 18,
      fontFamily: 'Calibri',
      fill: '#000',
      width: 100,
      padding: 5,
      align: 'center'
    }));

    box.on('mouseover', function () {
        document.body.style.cursor = 'pointer';
    });

    box.on('mouseout', function () {
        document.body.style.cursor = 'default';
    });

    layer.add(box);
    stage.add(layer);
    this.setState({stage: stage});
  }

  download = () => {
    const {stage} = this.state;
    const a = document.createElement('a');
    const event = new MouseEvent('click');
    a.download = 'test.jpg';
    a.href = stage.toDataURL({ pixelRatio: 1 });
    a.dispatchEvent(event);
  }

  handleImageChange = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
				imageUrl: reader.result
        });
      this.image2Canvas();
    }
    reader.readAsDataURL(file);
  }

  checkImageSize = (imgWidth, imgHeight, img) => {
    const {stage} = this.state;
    const uploadBgBlock = document.getElementById("uploadBgBlock");
    const bgBlockWidth = uploadBgBlock.offsetWidth;
    const bgBlockHeight = uploadBgBlock.offsetHeight;
    const layer = new Konva.Layer();
    let size = 0.2;

    console.log(bgBlockWidth, bgBlockHeight);
    console.log(imgHeight, imgWidth);
    while(bgBlockWidth < imgWidth || bgBlockHeight < imgHeight){
      imgHeight  = imgHeight / size;
      imgWidth  = imgWidth / size;
      size = size + 0.2;
    }

    const bg = new Konva.Image({
      x: 0,
      y: 0,
      image: img,
      width: imgWidth,
      height: imgHeight,
    });
    layer.add(bg);
    layer.batchDraw();
    stage.width(imgWidth);
    stage.height(imgHeight);
    stage.add(layer);

    for (let i = 0; i < 3; i++) {
      this.addBox(stage, i);
    }

    this.setState({stage: stage, canvasWidth: imgWidth, canvasHeight: imgHeight});

  }

  image2Canvas = (e) => {
    const {imageUrl} = this.state;
    const uploadBgBlock = document.getElementById("uploadBgBlock");
    const img = new window.Image();
    img.onload = () => {
      this.checkImageSize(img.width, img.height, img);
    }
    img.src = imageUrl;
  }

  download = () =>{
    const {stage} = this.state;
    const a = document.createElement('a');
    const event = new MouseEvent('click');
    a.download = 'test.jpg';
    a.href = stage.toDataURL();
    a.dispatchEvent(event);
  }

  render() {
    const {canvasWidth, canvasHeight} = this.state;
    return (
      <div className="App">
        <div className="topBlock">
          <div className="topText">excel2picture demo</div>
        </div>
        <div className="cotentBlock">
          <div className="uploadBlock">
            <div className="uploadBgBlock" id="uploadBgBlock">
              <input type="file" onChange={this.handleImageChange} accept="image/*" />
              <div className="container" id="container" style={{width: canvasWidth, height: canvasHeight}}></div>
            </div>
            <div className="uploadExcelBlock">
                <span>excelBlock</span>
            </div>
          </div>
          <button className="readyButton" onClick={this.download}>開始生成圖片</button>
        </div>
      </div>
    );
  }
}

export default App;
