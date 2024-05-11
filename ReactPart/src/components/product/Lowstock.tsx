import React from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import Viewpagelowstock from './Viewpagelowstock';
import DefaultLayout from '../../layout/DefaultLayout';

const Lowstock: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Low Stock Product List" />

      
        <Viewpagelowstock/>
      
      
    </DefaultLayout>
  );
};

export default Lowstock;
