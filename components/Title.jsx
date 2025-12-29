import React from 'react'

function Title({title1, title2, titleStyles, title1Styles, paraStyles, para}) {
  return (
    <div className={`${titleStyles}`}>
        <h3 className={`${title1Styles}`}>
            {title1}
            <span className="text-destructive font-light! underline">{title2}</span>
        </h3>
        <p className={`${paraStyles} max-w-md`}>
            {para ? para : "Explore our collection of stylish clothing and footware made for comfort, quality, and everyday confidence. "}
        </p>
      
    </div>
  )
}

export default Title
