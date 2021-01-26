import React, { Component } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Image } from 'react-konva';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
    file:'',
    image:'',
    imagePreviewUrl:'', 
    canvasUrl:'', 
    x: 20, 
    y: 20, 
    dis_x:'', 
    dis_y:'',
    s_x: 20,
    s_y: 20
    };
  }

  componentDidMount(){
    document.addEventListener("keydown", this.keyDownHandler);
  }

componentWillUnmount() {
    document.removeEventListener("keydown", this.keyDownHandler);
  }

  keyDownHandler = (e) => {
    const {x, y} = this.state;
    if(e.key === "Right" || e.key === "ArrowRight") {
        this.setState({x: x+10});
    }
    else if(e.key === "Left" || e.key === "ArrowLeft") {
        this.setState({x: x-10});
    }
  }

  moveObject = (e) => {
    setInterval(this.draw, 1);
   }

  draw = () => {
      const canvas = document.getElementById('testCanvas');
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.circle();
  }

  handleImageChange = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
				file: file,
				imagePreviewUrl: reader.result
        });
      this.image2Canvas();
    }
    reader.readAsDataURL(file);
  }

  image2Canvas = (e) => {
    const {imagePreviewUrl, image} = this.state;
    const img = new Image();
    img.onload = () => {
      const bgCanvas = document.getElementById('bgCanvas');
      bgCanvas.width = img.width;
      bgCanvas.height = img.height;
      const bgCtx = bgCanvas.getContext("2d");
      bgCtx.drawImage(img, 0, 0);

      this.setState({canvasUrl: bgCanvas.toDataURL("image/png"), image: image});

    }
    img.src = imagePreviewUrl;
  }

  download = () =>{
    const {canvasUrl} = this.state;
    const a = document.createElement('a');
    const event = new MouseEvent('click');
    a.download = 'test.jpg';
    a.href = canvasUrl;
    a.dispatchEvent(event);
  }

  render() {
    return (
      <div className="App">
        <div className="topBlock">
          <div className="topText">excel2picture demo</div>
        </div>
        <div className="cotentBlock">
          <div className="uploadBlock">
            <div className="uploadBgBlock">
              <input type="file" onChange={this.handleImageChange} accept="image/*" />
              <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                <Image
                  x={this.props.x}
                  y={this.props.y}
                  image={this.state.image}
                />
                </Layer>
              </Stage>
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
