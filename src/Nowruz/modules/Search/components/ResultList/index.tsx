import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AvatarLabelGroup } from 'src/Nowruz/modules/general/components/avatarLabelGroup';
import { Chip } from 'src/Nowruz/modules/general/components/Chip';

import css from './result-list.module.scss';
import { ResultListProps } from './ResultList.types';
import { Item } from '../../containers/SearchModal/SearchModal.types';
export const ResultList: React.FC<ResultListProps> = ({ list, onClose }) => {
  const selectedRef = useRef(null);
  const [selectedRowIndex] = useState(null);
  const [hoveredRowIndex] = useState<null | number>(null);
  const navigate = useNavigate();

  const onClickRow = (item: Item) => {
    let path = '';
    switch (item.type) {
      case 'projects':
        path = `/nowruz/jobs/${item.id}`;
        break;

      default:
        path = `/nowruz/jobs/${item.id}`;
        break;
    }
    onClose();
    navigate(path);
  };

  return (
    <div className="h-full overflow-y-auto flex flex-col flex-1 ">
      {list.map((item, index) => (
        <div
          ref={index === hoveredRowIndex ? selectedRef : null}
          className={`${css.rows} ${selectedRowIndex === index ? css.selected : ''}  ${
            hoveredRowIndex === index ? css.selected : ''
          }`}
          onClick={() => onClickRow(item as Item)}
        >
          <AvatarLabelGroup
            customStyle="w-auto"
            account={{ name: item.title, id: item.id, username: item.username, type: item.type, img: item.image }}
          />
          {item.isAvailable && (
            <div className={css.chip}>
              <Chip
                startIcon={<div className={css.dotIcon} />}
                label={item.type === 'users' ? 'Available for work' : 'Hiring'}
                theme="secondary"
                shape="sharp"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
