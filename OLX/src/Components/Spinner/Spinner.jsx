import ReactLoading from 'react-loading';
import styles from './loading.module.css'
function Loading (){
    return <ReactLoading className={styles.Loading} type={'spin'} color={'#000'} height={40} width={40} />
  }

  export default Loading