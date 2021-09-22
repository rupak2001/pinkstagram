import React from 'react'
import './css/postdummy.css'

var P_dummy = (props) => {
    return (
        <div id="p_dummywh">
            <div id="pdummytitle">
                <img src={props.dp} alt="dp" id="profpic" />
                <h4 id="profname">{props.uname}</h4>
            </div>
            <img src={props.act_img} alt="postimg" id="postimg"></img>
            <div id="inpbox1">
                <input className="likebtn" type="image" onClick={props.like} alt="like" id={props.likeid} src={props.likebpic}></input>
                <input type="image" onClick={props.compg} alt="comment" id = {props.commentbutid} class="comment" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANwAAADlCAMAAAAP8WnWAAAAh1BMVEX////t7e3u7u4AAADr6+vy8vL29vb4+PjS0tLDw8Pi4uK2trbW1tbn5+fOzs52dnaurq58fHy7u7uTk5Nvb2+np6ehoaFcXFxCQkKKiorc3NxjY2NLS0saGhpra2uMjIwyMjIQEBA7OzsnJydSUlKamppXV1cNDQ2BgYEpKSlGRkYhISE2Njb3lJl9AAAOEElEQVR4nO1daWOiPBAGahIBxRO8e9va7v7/3/fiUZ1JJiEISNy3+bLPlmseyRyZhInn7ZsfBIH/z6HAa12EX3K/5DTkOr7vd/455Hu+E3I0g7zAiR7UDPold6/oJjrHOBf8gETejoixoHmda+z+xx+P9cJ0spjO1s8vD8f25/V7Nlhk4VLsGbKgSWt5aHX3h4BxwaL4abV5MLXv6XYciUYkaNCJR/FibaQF2ss0XR56qfPkGPO8cPFlS+zcVllPcNYMuXr6uc9ElK5KEzu1zS6sUZaaI5RczWLrvqhpo+T0+pyKUALOw6vfGXp/k6CqLLU78WhSB7Nj+0icIrd8rI/avm1Sxp2IUJiXVNU0qj353K8gVU0RSvK3AWoHel4eoLUaoXTnDVE70At4e06c9z8sRHxejdI4WfajTh5JeoJ1oiROn6brl+JLH7JKjr0COe6PCkR7m6bdiAl+HAZcLFdO8vC3aFwYpL2F1cmV79OBGBqlmj+Fh4jYbK8YZ710YLzRjF0lX5UIhXdMv/noQMz2zpz3MtPdMh5c+Qau8nOMb7WifC6SUz8scb+878Z6/X1dlrxfFSfOo1ftO+tyzq40cWyo9SrpzciJVCPC3+FVIoA7Jzr9W/MbRSgz+vmzGkYsjHcmn/Ttwysk9UrKwXv0wwf96pHcyb6kdG5iV/p+ZSMUjQOYslJ3MSMmhiS9uSh5v5JOnJN+e7Usax4LENP8hlGj5N6JJ74mgtVCCSNygBg2F6GwN+J5MWf1Zxz3KKAMVyaaiVBYj3jYtFNnzgOhQITEA3dl7mLt51iiPukzFPX1QwoRbu+xxF2syRE/46CJTCpGxFM/6idHvLfwFjNEQg05362fa6lzKrc5a0TTVJ+uxuhrYZl/8GyexNTeMeLNz0Cd0JJ4d1bXWkUohC2JRfM98oyEMgiZWV1r5cRVH7C8ASWIlLzotC5yTL7zht2G0gUJJV6Z1BSh/JHuOy+8onbkq2PIIa8hQuFyeuODV8yVXocUm9YtvrbIZwh5HLBqa/1DV2bnF15bICqXu8PjrdVNHyO9VSUn/1yrm1MyeKRVxQhFut1Md95NkBJLpFUiFDmw+64671IVjSV2ifEKY4TCM3yrP+2vpZJMwKfxCpMTZ3JQx1tTtwuSjPf0WnL8Gd9o2R4lEKtImhIWkyPHGlLIM9acd+NYhUlpP8MV+ggl6OObjETbvE7Ix3KtxBURisATwvNbjnHMSHIIoX7yVUdODk1464bygnZIspfy5Dqy3rZOCSC8cO5JT47WOYGTaqPWNQ0hafQc6M7z6DtE0ptvcD3rNQhHFzONrdNFKHgQF147WdoYwtYuoeXTOHEcfw+EI5QuCPupOZ341pDDsYkzlADCEcaYnGciIxRpaJFf6YamIYQWID0LnziPjlCQqZ1zN9hgxPDoJ7SOUPCL69a9rroeJNBE6F9rJ44SvI+ifSIUYthb5QbTihx2kVETc8K1IJSGfqdiX0Ln0HTtiLevXxqEhwc9IgPiydcFePzNW+egRXwKBR2o56kRCkcx90g66hKStE49T3XieNqjzsUztSOBvmRIi8mxGF6wcoYIhfD6CjUBrUQoHLkPc16wdSS+obDLoggF98q5Gxz0CIUbA14QoTCUXYid6H0mhA1EgRPH088uiG9GCyiukirC5HCSeeeC+GaE5B3IiwexzjE0flc01D2E533ldWge/j889004w0GP0MLMfQimj1A4PHVS7Uua2yAhSWxw4mgE2HUuLUQhODHyJUzk4ATRxr20EIVQv4wYQe6nJ8OV57uGVsDWjNDAZ8iwzgFriUc7iQOSWyABM3UjfBT6OYZeMd0LnEMc+vENPgrJoYX1a2fENyOch2Racij2mjgjfgFC81F4FhnonO/Lp7mhVUXjHvhKtuioB85GY7/7qbz0BKSewXwWilCgPaGznE4iFHnAKRHkxGFqaNS+0LYI5YkiHTmYYRi2L7Q1QqaCKeSO/Ree1Gtfl6wR/Bo0ZZoIBZLr+45IXoyQe55oIhS0tpK70ueKEcr7oMWugBzMWL46OrdDkoMxyreGHEwxPN7Tm0PxviZCgRHogrWvS7bI55gcFaGgGZChK5LbIBQ2Li+WEEQoHE4rhK70ORvE4eR/NzgfBU4cTTL3XBDamhx0dCAzC8nBU0p+tNwyOfhaYoXcvocK+HJ9F3TJFjGoUMNLZhZGKFAt+46tZDMjuMRwSEcokNxdpCzPCNr5lHbikJwbQtsi6KGzYnL39ebgWHxLRyjozTmhS7YIk6MiFDSl0Lq8ZRCDOjeB1vL8dmVyrvS5YoQGdFvaiUNywgWhrclBV5AVk7v598SVyMElbkMyQuFv4JS+C7pki/hMJSdHKHDFSnJXEQpcq57QEQoMP0NnV1lSCH7J3qOdOOy56V2Rg9aiT5ND3uKOciiynScjFLhUX11H5S7Ck1jwqHc+By1m/3BFchsEU3tf4FtBEKGg1YsbV/qcDYJJ2RnQJ+DEA7Qa0QWhbREc8YxoctjoRA4IbYvgOputSu7Yf+H8K/39iJsIrp6JNbM8DC5lXzRWia1uhD+LjpC1vPg5Bn3Be82FD5tDeK0GOgrJocllNz9PosjBwmCvOnIBmlzutS20LULTACNM7qJzHRTGpMe/uaBVZoTmeIboqAfPhqHzoLg6kxsI9bcEZrZAhOLj6cdP7kKfs0BoNR613vJ0IlpC1Gu8vmM9CHa3d6Enh2KU7E7IQZm3nCD3039hMmLtSo0QM0KftCf6lbLSZwUOfxd4Qbj4snQUfRGCv9mKyV7gGEKzivIXcfhzFwFr4Hy4Ib4R4dhraCSHv+m8g8ws7pWRTA7qnFS4IHVCq4wIDbC/5VoEnvR/ePKzoXaRG0julfgojlA8qWhY4vrQAFcBY9JR5YNc5Damjg/q8KqvtXyeQo6jmmGdtsU3I2z/Yg05oKGoispEOuoWCgIoqzobrNZDwR/Buz3uQV8PD9QqEmpVDVR3InU6ekbvgfjcTyWHTMqLyx/RoWIEr4SkRD0UVLd56PCKlBdJUJWcrHPS0PaFOaJfKkIvjrQOnnodNinOxmAopUfadSVC2XsPXFOr9d6nQTj06hPn0UXNELmFA0QohNPoXVty0qvrqDbHCYQGn6menNxXEbn3Mnvh3DLDAFPN1E5ZdMU2JlWyc4SNjKBFeSetJdnnpP0Xyu6wdSOEwg2y7hdJTqoo22Y5eANCr2BJOXHaWghcBHLcOhESQRFjuwhlj+QC87xt/SIRHIcviGoLnu4OqByamntxATG4jIHYbYCKUI4ITdaZ6gm3h3CNMvU8Q2F4qUp14golQA6lUJhynoGckLZ1US9uHQn517eIUI7Ix3X6Hr4057WIUHmlTDnPuC8PHjDtw7C22cgIWpSVTQ4FIGnXxZHQnNcagj//H7WYs3nbD0zuULPCAUoXhDSnU5KcvH9Z7AQlgJBFUWvtGXTOU3c7DTXntYXgWrxM+ULaM97BV3Zpjp1aH4ym5wb2EcoPelPYFV1xQ4RKQj2XcOInFEjklLnZVsnh4julyambIl65LXsTKEAWRd6s0WbnQHkDqkMQ7YbOdVAN+7hMhHJCIpPZrZgrsQpa3TtS6lsa/dwJLWR2r1QOtA2E0s5zpTKpDTliA+WlI+SUem3lyUnj8h+z0j45nHaWV/fa1i5T2c1c0LkOWh41lI56lvcSxNbeTlSsg8stJ3g3k+II5Yx2Krud7bUNImhRPoxlV61vc2qbbuvkkEUxFsw1o1hl9zAV1OYcN0S4Ro+ppmwBIraDz0cavN2ZZSjL2LBStgixzgvB7i1pIPJgttUhOEw7Z/ho2d1F5W2cD23eE/WuV8me4iW3G1txWHVihY+W3jr1iWL3sE5ETd8nB+fPG14HWRJ4nOdv0XCFKe1cfl9YUvFyUcZ15MaY6EuZjfUoC02RLB7SSQVzy+jcEUV487dz26SixF1ITROJGgkd2izvp77I36J6LZqlS9BR7xo5CI93bNPw+tkgxvvDV92ND+3PdBt2mZAZQjOwhZa7RIQCUfSsE2Azia64n+dxFj/q7onb3+kk3BNg7LRyCw7Iphyr7zXk1Jwf/IEnPZZbgRIWxONjS2bnNt9lYXQ0qNCifGkL5pb6pZekU/hpj8OejSUPGBd+d6tR4uK2fop7Ao16Oiq5K3QkEEPdI09tlSUMWPLLtb7/8+BevDOrmU1DC5dDXU3Z0oj2eai979IwivI3dHyR+b8H1F+mT6uv4stLN1S7stL+5zwiRnl0+3p9n60eH1ez9/kzFcPV1UbVnDhETCxXxQ+8ZZvXRy7YhxRlDV2zrWKEoiBGDNKrtechZ93hZLUpPlVuy6oRioQC7qdXiKFts1CcrI/wk3j3XnwFaClZsa1iKJ/U1Ds/J5GQ65/zMBvY+sIdWdSs8ohFpFc743MbdPfjVOUZLH+JzE+ygTbsO7f1JXiok1we1C+zKvymocXTenGBKl5GXtdHKLT25U56rBm1mNvXImQ2VUryR+TnieV48qG5U+98RbUIhXx6zi9JSyng82gYlXvagaHHu0PC2oSXzGxVP6cN9Pvjhe63hbymWdLPR2imRIJZE0Q0Tkewkh7Y7asRcqcHc9EP48ngg4ohv2e7bdyrQ4Jjb+7Hk8ejtZndhNweHdVIsKiXdJMwDONxmHQ7e50vSvyU/ylzgxqNJ6uXS079RjvU/JiuvbLII6D6kC/9zWucV3uopgjFTVSrE3cN/R/IuaEj9evcbaxlO6hhP9cu+iV3r+jf1jlH5PiNUEqi/4MTd0OYhsi5oSO/EUoZ9G/7uV9yd4r+Az6vQ7SFbLkwAAAAAElFTkSuQmCC"></input>
            </div>
            <div style={{ display: "flex", flexDirection: "row", height: "40px" }}>
                <p id={props.totlikes} style={{ fontWeight: 600, marginRight: "5px" }}>{props.countlikes}</p>
                <p>likes</p>
            </div>
            <div style={{ display: "flex", flexDirection: "row", height: "40px" }}>
                <p id={props.totcomms} style={{ fontWeight: 600, marginRight: "5px" }}>{props.countcomms}</p>
                <p>comments</p>
            </div>
            <div id="nddiv" style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <p style={{ fontWeight: 600 }}>{props.desc_uname}</p>
                <p style={{ fontSize: "20px", marginLeft: "6px" }}>{props.desc}</p>
            </div>
            <div id="othcmm">
                <h4>{props.txtuname}</h4>
                <p>{props.txtcmnt}</p>
            </div>
            <div id={props.commid} className="commid">
            </div>
            <div id="comment_inp">
                <input name={props.countcm} type="text" placeholder="Add a comment" className="comments" onChange={props.commnt_val}></input>
                <button id="comnt_pst_btn" onClick={props.post_cmnt}>post</button>
            </div>

        </div>
    )
}

export default P_dummy;