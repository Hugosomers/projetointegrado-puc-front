import React from 'react';
import styles from './page.module.css';

interface ResultProps {
  investido: number;
  juros: number;
  valorTotal: number;
  taxaAplicada: number;
}

const Result = ({
  investido,
  juros,
  taxaAplicada,
  valorTotal,
}: ResultProps) => {
  return (
    <div className={styles.resultsWrapper}>
      <h3 className={styles.resultsTitle}>
        Aqui são os resultados dos seus investimentos:
      </h3>

      <p className={styles.result}>Juros aplicado: {juros}</p>
      <p className={styles.result}>Taxa aplicada: {taxaAplicada}</p>
      <p className={styles.result}>
        Valor investido:{' '}
        <span style={{ color: '#32B04A' }}>R$ {investido}</span>
      </p>
      <p className={styles.result}>
        Valor total retornado:{' '}
        <span style={{ color: '#32B04A' }}>R$ {valorTotal}</span>
      </p>
    </div>
  );
};

export default Result;
