import React from 'react';

import { Pagination } from 'antd'

interface PaginationProp {
    currentPage: number;
    totalPages: number;

    PageSize: number;
    onChange: (page: number) => void;
}


const Pages: React.FC<PaginationProp> = ({ currentPage, totalPages, PageSize, onChange}) => (
    <>
        <Pagination 
            pageSize = {PageSize}
            current = {currentPage}
            total={totalPages}
            onChange={onChange}
        />
    </>
)

export default Pages;