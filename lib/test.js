import { Component } from 'react';



  import PropTypes from 'prop-types';


class TestComponent extends Component {
  
    static defaultProps = {
         
        
        
      
        open: false
      }
  

  render (){
    
    const { title, likes, open } = this.props;
    return (
      null
    )
  }
}


  Some.propTypes = { 
     
      
      title: PropType.string.isRequired,
     
      
      likes: PropType.nubmer,
     
      
      open: PropType.bool.isRequired,
    
  }
