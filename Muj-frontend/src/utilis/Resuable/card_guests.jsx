import Styles from "./compocss.module.css"


let CardTeamMember = ({ work,name,bio,link }) => {
  let r = Math.random() * 170 + 130;
  let g = Math.random() * 170 + 150;
  let b = Math.random() * 170 + 120;
 

  return (
    
<div 
 
 className={`${Styles.fullcard}`} 
 
 >
<div className={`${Styles.forimage}`} >  
<img   src={link} className={`${Styles.portraits}`}  />

</div>
<div className={`${Styles.cardinfo}`}  style={{backgroundColor: `rgb(${r},${g},${b}) `}} >

<div className={`${Styles.name}`} >{name}</div>

<div  className={`${Styles.work}`} >{work}  </div>

<div className={`${Styles.linkedindiv}`}>  
<button  className={`${Styles.Linkedin}`}>Linkedin</button>
    
      </div>
<div className={`${Styles.about}`}>{bio}</div>
</div>


</div>

  );
};

export default CardTeamMember;