import React from 'react';

function CardCommon({ label, number, percentage }) {
  return (
    <div className="rounded-4 p-3 border shadow-sm">
      <div>{label}</div>
      <div className="d-flex justify-content-between align-items-end">
        <h1 className='fw-semibold'>{number}</h1>
        <div className="text-muted border rounded-2 px-2">{percentage}%</div>
      </div>
    </div>
  );
}

export default CardCommon;
