import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
export default function AllFeedbackGrid({
  id: messageId,
  description,
  clientApproval,
  categoryParent,
  updateData,
  setUpdateData,
}) {
  console.log(categoryParent);
  const [category, setCategory] = useState(
    categoryParent ? categoryParent : ''
  );

  const handleChange = (event) => {
    setCategory(event.target.value);

    setUpdateData([
      ...updateData.filter((item) => {
        return item.id !== messageId;
      }),
      { id: messageId, category: event.target.value },
    ]);
    console.log(updateData);
  };

  {
    console.log(category);
  }
  return (
    <Grid container spacing={6}>
      <Grid item xs={5} md={5} lg={5}>
        <p>{description}</p>
      </Grid>
      <Grid item xs={4} md={4} lg={4}>
        <select
          value={category}
          onChange={handleChange}
          style={{
            width: '90%',
            height: 40,
            border: '1px solid #768C15',
            borderRadius: '5px',
            fontWeight: '600',
            outline: 'none',
          }}
          disabled={clientApproval !== 'pending'}
        >
          <option value='' disabled>
            Select a category
          </option>
          <option value='feedback'>Feedback</option>
          <option value='with-cost'>Change request with cost impact</option>
          <option value='without-cost'>
            Change request without cost impact
          </option>
        </select>
      </Grid>
      <Grid item xs={3} md={3} lg={3}>
        {clientApproval == 'pending' && category != 'feedback' && (
          <p style={{ color: '#9F9F9F', fontWeight: 600 }}>Pending</p>
        )}
        {clientApproval == 'approved' && (
          <p style={{ color: '#6D8217', fontWeight: 600 }}>
            Approved <CheckCircleIcon />{' '}
          </p>
        )}
        {clientApproval == 'not approved' && (
          <p style={{ color: '#9F9F9F', fontWeight: 600 }}>Not Approved </p>
        )}
        {clientApproval == 'rejected' && (
          <p style={{ color: '#FF5555', fontWeight: 600 }}>Rejected </p>
        )}
      </Grid>
    </Grid>
  );
}
