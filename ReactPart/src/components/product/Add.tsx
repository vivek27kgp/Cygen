import React from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Addproductpage from './Addpage';

const Addproduct: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Product List" />

      
        <Addproductpage />
      
      
    </DefaultLayout>
  );
};

export default Addproduct;
