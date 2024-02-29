'use client';

import { Button, Input, Select, Switch } from 'antd';
import { useEffect, useState } from 'react';

import { PERIOD } from './types';
import styles from './page.module.css';
import Result from './Result';
import { useGetInvestmentReturnMutation } from './api';

export default function Home() {
  const periodOptions = [
    {
      label: 'Dias',
      value: PERIOD.DAYS,
    },
    {
      label: 'Meses',
      value: PERIOD.MONTHS,
    },
    {
      label: 'Anos',
      value: PERIOD.YEARS,
    },
  ];

  const translatePeriod = {
    [PERIOD.DAYS]: 'dias',
    [PERIOD.MONTHS]: 'meses',
    [PERIOD.YEARS]: 'anos',
  };

  const [options, setOptions] = useState({
    period: PERIOD.MONTHS,
    periodAmount: 5,
    value: 0,
  });

  const [mock, setMock] = useState(false);
  const [data, setData] = useState({
    investido: 0,
    juros: 0,
    taxaAplicada: 0,
    valorTotal: 0,
  });

  const [getInvestmentTrigger, { data: apiData, isLoading }] =
    useGetInvestmentReturnMutation();

  const applyHandle = () => {
    if (!mock) {
      getInvestmentTrigger(options);
    } else {
      setData({
        investido: options.value,
        juros: 750,
        taxaAplicada: 100,
        valorTotal: options.value + 650,
      });
    }
  };

  useEffect(() => {
    if (apiData) {
      setData(apiData);
    }
  }, [apiData]);

  return (
    <main className={styles.main}>
      <h1 className={styles.pageTitle}>Simule seus investimentos na CDI</h1>

      <div className={styles.options}>
        <div className={styles.optionWrapper}>
          <p className={styles.optionLabel}>Selecione o período desejado:</p>
          <Select
            className={styles.selector}
            value={options.period}
            onChange={(e) =>
              setOptions((prevState) => ({ ...prevState, period: e }))
            }
          >
            {periodOptions.map((option) => (
              <Select.Option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </div>

        <div className={styles.optionWrapper}>
          <p className={styles.optionLabel}>
            Selecione quantos {translatePeriod[options.period]} desejados:
          </p>
          <Input
            value={options.periodAmount}
            type='number'
            onChange={(e) =>
              setOptions((prevState) => ({
                ...prevState,
                periodAmount: Number(e.target.value),
              }))
            }
          />
        </div>

        <div className={styles.optionWrapper}>
          <p className={styles.optionLabel}>Selecione o valor investido:</p>
          <Input
            value={options.value}
            type='number'
            onChange={(e) =>
              setOptions((prevState) => ({
                ...prevState,
                value: Number(e.target.value),
              }))
            }
          />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <p className={styles.optionLabel}>Usar dados mockados:</p>
        <Switch
          checked={mock}
          onChange={(checked) => setMock(checked)}
        />
      </div>
      <Button
        type='primary'
        onClick={applyHandle}
        disabled={!options.value}
        loading={isLoading}
      >
        Aplicar
      </Button>

      {data && (
        <Result
          investido={data?.investido}
          juros={data?.juros}
          taxaAplicada={data?.taxaAplicada}
          valorTotal={data?.valorTotal}
        />
      )}
    </main>
  );
}
