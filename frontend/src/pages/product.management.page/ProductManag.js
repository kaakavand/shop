import { HeaderPanel } from 'layout';
import React, { useState } from 'react';
import style from './productManage.module.scss'
import Button from '@mui/material/Button'
import ProductsList from './components/ProductsList.component';
import ModalAdd from './components/ModalAdd.component';

function ProductManag() {

  const [first, setfirst] = useState(false)

  return (
    <>
      <HeaderPanel>
          <div className={style.container}>
            <div className={style.row}>
              <h3>مدیریت کالا ها</h3>
              <Button variant="contained" className={style.button} onClick={() => setfirst(true)}>افزودن کالا</Button>
            </div>
            <ProductsList/>
          </div>
      </HeaderPanel>
      {first ? <ModalAdd setModalAdd={() => setfirst(false)}/> : null}
    </>
  );
}

export default ProductManag;