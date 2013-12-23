/** @jsx React.DOM */

var Color = React.createClass({
  render: function() {
    var divStyle = {
      float: "left",
      width: this.props.size,
      height: this.props.size,
      backgroundColor: "rgba(" + this.props.red + ", " + this.props.green + ", " + this.props.blue + ", 1.0);"
    };
    return (
      <div className="color" style={divStyle}></div>
    );
  }
});

var Palette = React.createClass({
  render: function() {
    var swatchSize = this.props.swatch;
    //var swatchSize = 25;
    var paletteItems = this.props.palette.map(function (color) {
        var divStyle = {
          float: "left",
          height: swatchSize,
          width: swatchSize,
          backgroundColor: "rgba(" +color[0]+","+color[1]+","+color[2]+",1.0);"
        };

        return <div style={divStyle} ></div>
      });
    return(
      <div className="Palette" style={this.props.style}> {paletteItems} </div>
    );
  }
});

var RGBQuant = React.createClass({
  getInitialState: function() {
    var image = new Image();
    image.src = this.props.url;
    image.onload = function() {
      this.processImage(image);
    }.bind(this);

    return {
      opts: {
        colors: this.props.colors,        // desired palette size
        method: 2,                        // histogram method, 2: min-population threshold within subregions; 1: global top-population
        boxSize: [64,64],                 // subregion dims (if method = 2)
        boxPxls: 2,                       // min-population threshold (if method = 2)
        initColors: 4096,                 // # of top-occurring colors  to start with (if method = 1)
        minHueCols: 0                     // # of colors per hue group to evaluate regardless of counts, to retain low-count hues
      },
      palette: [],
      swatch: this.props.swatch
    }
  },
  processImage: function(image) {
    var q = new RgbQuant(this.state.opts);
    var pal;
    q.sample(image);
    pal = q.palette(true);
    this.setState({palette: pal});
  },

  render: function() {
    var imageStyle = {
      float: "left"
    };

    var paletteStyle = {
      float: "left",
      width: this.props.swatch * 2,
      marginLeft: "1em",
      marginRight: "1em"
    };
    var link = React.DOM.a({href: "http://www.metmuseum.org/Collections/search-the-collections/484092?rpp=20&pg=1&rndkey=20131223&ao=on&ft=*&deptids=21&where=Germany&who=Gertrud+Preiswerk&pos=12"}, 'Metopolication Museum of Art');
    return (
      <div className="RGBQuant">
        <img style={imageStyle} width="256" src={this.props.url} />
        <Palette swatch={this.state.swatch} palette={this.state.palette} style={paletteStyle}/>
        <p>
          <b>BAUHAUS ARCHIVE</b><br/>Gertrud Preiswerk (German (born Swiss), Basel 1902–1994)<br/>
          Source: {link}
        </p>
      </div>
      );
  }
});

React.renderComponent(
  <RGBQuant colors="12" swatch="36" url="img/bauha-gertr-dp8489.jpg" />,
  document.getElementById('example')
);