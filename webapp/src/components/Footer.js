import React from 'react'

const Footer = () => (
  <div className="row footer">
    <div className="col-lg-8 col-lg-offset-2 copyright">
      <div className="dashed"></div>
      <div className="text">
        <span>About <a href="https://medium.com/@tanykim/side-project-10-years-of-twitter-8fd5724f7b1a" target="_blank">Datasets</a></span>
        <span className="divider"></span>
        <span>Code at <a href="https://github.com/tanykim/twitter-ten-years" target="_blank">GitHub</a></span>
        <span className="divider"></span>
        <span>
          Share on <a href="https://twitter.com/intent/tweet?text=Awesome%20Visualization%20with%2010%20Years%20of%20Twitter%20Data&hashtags=datavis,d3&url=https%3A%2F%2Ftwitter.tany.kim%2F" target="_blank">Twitter</a> and <a href="https://www.facebook.com/sharer/sharer.php?u=http%3A//twitter.tany.kim" target="_blank">Facebook</a>
        </span>
      </div>
    </div>
  </div>
)

export default Footer
