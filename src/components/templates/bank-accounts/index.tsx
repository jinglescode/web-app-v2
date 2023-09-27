import { Button } from 'src/components/atoms/button/button';
import { Card } from 'src/components/atoms/card/card';
import { printWhen } from 'src/core/utils';

import css from './bank-accounts.module.scss';
import { BankAccountsProps } from './bank-accounts.types';

export const BankAccounts: React.FC<BankAccountsProps> = ({ accounts, bankAccountLink, isDisabled }) => {
  return (
    <Card className={css.container}>
      <span className={css.header}>Bank accounts</span>
      {printWhen(
        accounts?.map((account) => (
          <div className={css.content} key={account.account}>
            <img src="/icons/bank.svg" />
            {account.bank_name} - {account.account}
          </div>
        )),
        !!accounts?.length
      )}
      <Button color="white" disabled={isDisabled} className={css.btn}>
        <a href={bankAccountLink} target="_blank" className={`${css.link} ${isDisabled && css.link__disabled}`} rel="noreferrer">
          <img src="/icons/add.svg" width={18} height={18} />
          Add a bank account
        </a>
      </Button>
    </Card>
  );
};
