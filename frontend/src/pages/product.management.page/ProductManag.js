import { HeaderPanel } from 'layout';
import React from 'react';
import style from './productManage.module.scss'
import Button from '@mui/material/Button'
import BasicTable from './components/ProductsList.component';

function ProductManag() {
  return (
      <HeaderPanel>
          <div className={style.container}>
            <div className={style.row}>
              <Button variant="contained" className={style.button}>افزودن کالا</Button>
              <h3>مدیریت کالا ها</h3>
            </div>
            <BasicTable/>
          </div>
      </HeaderPanel>
  );
}

export default ProductManag;
