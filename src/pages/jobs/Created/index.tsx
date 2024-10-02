import { useNavigate } from 'react-router-dom';
import { Button } from 'src/modules/general/components/Button';
import { Icon } from 'src/modules/general/components/Icon';
import { OrganizationJobListing } from 'src/modules/Jobs/modules/OrganizationJobListing';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './list.module.scss';

export const CreatedList = () => {
  const navigate = useNavigate();

  const navigateToCreateJob = () => {
    navigate('../create');
  };
  const headerClass = `${css.header}`;

  return (
    <div className={css.container}>
      <div className={`flex flex-col justify-start md:flex-row md:justify-between`}>
        <div className={headerClass}>
          <h1 className={css.title}>{`Jobs listing`}</h1>
          <h2 className={css.subtitle}>{`Manage your published and draft job listings here.`}</h2>
        </div>

        <div className="flex md:justify-end w-3/6">
          <Button
            startIcon={<Icon name="plus" color={variables.color_white} />}
            color="primary"
            variant="contained"
            onClick={navigateToCreateJob}
          >
            Create job
          </Button>
        </div>
      </div>
      <div className={css.list}>{<OrganizationJobListing />}</div>
    </div>
  );
};
