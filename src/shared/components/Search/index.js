import React from 'react';
import { Link } from 'react-router-dom';

import Filter from '../../containers/Filter';
import Input from '../../containers/Search';

import styles from './index.css';

const Search = ({isMobile}) =>
  <React.Fragment>
    <Input
      styles={{
        form: styles.form,
        input: styles.input
      }}
      placeholder="Search for rentals..."
      button={
        <svg className={styles.inputIcon} width="16" height="16" viewBox="0 0 63 63">
          <path fill="#AAB1AE" d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
        </svg>
      }
    />
    <Filter isMobile={isMobile} />
    <Link to="/listings/create" className={styles.btn}>
    <span className={styles.desktop}>
      Add Property
    </span>
    <span className={styles.mobile}>
      +
    </span>
    </Link>
  </React.Fragment>

export default Search;
