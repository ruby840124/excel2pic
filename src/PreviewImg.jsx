import React from 'react';
import Konva from 'konva';
import './App.css';

const initialState = {

};

class PreviewImg extends React.Component{
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.initStage();
  }

  componentWillUnmount() {

  }

  componentDidUpdate(prevProps){
    if(this.props.bgImg !== prevProps.bgImg){
      this.updateBgImg();
    }
  }

  initStage = () => {
    const {canvasWidth, canvasHeight} = this.props;
    const stage = new Konva.Stage({
      x:0,
      y:0,
      container: 'container',
      width: canvasWidth,
      height: canvasHeight,
    });
    this.setState({stage: stage});
  }

  updateBgImg = () => {
    const {bgImg, canvasWidth, canvasHeight} = this.props;
    const {stage} = this.state;
    const layer = new Konva.Layer();
    const bg = new Konva.Image({
      x: 0,
      y: 0,
      image: bgImg,
      width: canvasWidth,
      height: canvasHeight,
    });
    layer.add(bg);
    layer.batchDraw();
    stage.width(canvasWidth);
    stage.height(canvasHeight);
    stage.add(layer);
  }

  /*addBox = (stage, i, excelTitleData) => {
    const {canvasWidth} = this.state;
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
      text: excelTitleData[i],
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
        const img = new window.Image();
        img.onload = () => {
          this.checkImageSize(img.width, img.height, img);
        }
        img.src = reader.result;
        this.setState({imageUrl: reader.result});
    }
    reader.readAsDataURL(file);
  }

  checkImageSize = (imgWidth, imgHeight, img) => {
    const {stage, excelTitleData} = this.state;
    const uploadBgBlock = document.getElementById("uploadBgBlock");
    const bgBlockWidth = uploadBgBlock.offsetWidth;
    const bgBlockHeight = uploadBgBlock.offsetHeight;
    const layer = new Konva.Layer();
    let size = 0.2;

    stage.destroyChildren();

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

    if(excelTitleData){
      for (let i = 0; i < excelTitleData.length; i++){
        this.addBox(stage, i, excelTitleData);
      }
    }
    this.setState({canvasWidth: imgWidth, canvasHeight: imgHeight});
  }

  getExcelTitle = (data) => {
    let titleArray = [];
    for (var key in data[0])
        titleArray.push(key);
    this.updateExcelData(titleArray);
    this.setState({excelTitleData: titleArray});
  }

  updateExcelData = (excelTitleData) => {
    const {stage, imageUrl, canvasWidth, canvasHeight} = this.state;

    if(imageUrl){
      const layer = new Konva.Layer();
      const bg = new Konva.Image({
        x: 0,
        y: 0,
        image: imageUrl,
        width: canvasWidth,
        height: canvasHeight,
      });
      layer.add(bg);
      layer.batchDraw();
      stage.add(layer);
    }

    for (let i = 0; i < excelTitleData.length; i++){
      this.addBox(stage, i, excelTitleData);
    }
  }*/

  render() {
      const {canvasHeight, canvasWidth} = this.props;
    return (
        <div className="container" id="container" style={{width: canvasWidth, height: canvasHeight}}></div>
    );
  }
}
export default PreviewImg;