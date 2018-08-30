import React from "react";
import LazyLoad from 'vanilla-lazyload';

if (!document.lazyLoadInstance) {
  document.lazyLoadInstance = new LazyLoad({
    elements_selector: '.lazyImg',
    threshold: 300,
    callback_load: function(img){
      img.classList.add = 'loaded';
    }
  });
}

export default class LazyImg extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    document.lazyLoadInstance.update();
  }

  componentDidUpdate(prevProps, prevState){
    document.lazyLoadInstance.update();
  }

  render(){
    return(
      <img
        className="lazyImg"
          data-src={this.props.src}
        onError={(event) => {
            event.target.src="https://via.placeholder.com/350x150" }} />
    );
  }

}
