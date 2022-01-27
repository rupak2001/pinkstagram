import React from "react";


var Search_box = (props)=>{
    return(
        <div className="w-full h-full mt-5 flex flex-col">
            <input type="text" placeholder="search people" id = "mob_search_bar" onChange={props.search_mob_inp} className="w-full h-12 pl-5"/>
        </div>
    )
}

export default Search_box;