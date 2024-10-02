import { Button } from 'src/modules/general/components/Button';
import { Icon } from 'src/modules/general/components/Icon';
import { Pagination } from 'src/modules/general/components/Pagination';
import { Overlay } from 'src/modules/general/components/slideoutMenu';
import { FilterSlider } from 'src/modules/Search/components/FilterSlider';
import { useSearch } from 'src/pages/search/useSearch';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './list.module.scss';

export const Search = () => {
  const {
    data: {
      page,
      searchResult,
      total,
      PER_PAGE,
      readableType,
      q,
      sliderFilterOpen,
      filter,
      countryName,
      scrollRef,
      scrollIndex,
    },
    operations: { setPage, card, handleCloseOrApplyFilter, onApply, onClose, handleChangeMobilePage },
  } = useSearch();

  const headerClass = `${css.header}`;
  return (
    <div className={css.container}>
      <div className={css.headerContainer}>
        <div className={headerClass}>
          <h1 className={css.title}>{`Search for ${q}`}</h1>
          <h2
            className={css.subtitle}
          >{`${total} ${readableType.title} found ${countryName ? `in ${countryName}` : ``}`}</h2>
        </div>
        <div>
          <Button color="secondary" variant="outlined" className={css.filterButton} onClick={handleCloseOrApplyFilter}>
            <Icon fontSize={20} name="filter-lines" color={variables.color_grey_700} />
            Filters
          </Button>
        </div>
      </div>
      <div className={css.list}>
        {searchResult.items?.map((item, index) => (
          <div key={item.id} className="mt-6" ref={index === scrollIndex ? scrollRef : null}>
            {card(item, index)}
          </div>
        ))}

        <div className="mt-11 hidden md:block">
          {total >= PER_PAGE && (
            <Pagination page={page} count={Math.ceil(total / PER_PAGE)} onChange={(e, p) => setPage(p)} />
          )}
        </div>

        {(searchResult.items?.length ?? 0) < total && (
          <div className="mt-5 flex items-center justify-center md:hidden">
            <Button color="primary" variant="text" onClick={handleChangeMobilePage}>
              See more
            </Button>
          </div>
        )}
      </div>
      <Overlay
        open={sliderFilterOpen}
        onClose={handleCloseOrApplyFilter}
        title="Filter by"
        subtitle={`Filter ${readableType.title} by social causes, skills and more`}
      >
        <FilterSlider type={readableType.type} onApply={onApply} onClose={onClose} filter={filter} />
      </Overlay>
    </div>
  );
};
