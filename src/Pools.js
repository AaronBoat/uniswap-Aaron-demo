import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// GraphQL 查询
const GET_POOLS = gql`
  {
    pools(first: 5) {
      id
      feesUSD
      token0 {
        symbol
      }
      token1 {
        symbol
      }
      volumeUSD
    }
  }
`;

// Pools 组件
function Pools() {
  // 执行 GraphQL 查询
  const { loading, error, data } = useQuery(GET_POOLS);

  // 用于控制模态框的状态
  const [showModal, setShowModal] = useState(false);
  const [selectedPool, setSelectedPool] = useState(null);

  // 显示加载动画
  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // 显示错误提示
  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        Error: {error.message}
      </div>
    );
  }

  // 打开模态框并设置选中的池子
  const handleViewDetails = (pool) => {
    setSelectedPool(pool);
    setShowModal(true);
  };

  // 关闭模态框
  const handleClose = () => setShowModal(false);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Top Pools</h2>
      <div className="row">
        {data.pools.map((pool) => (
          <div className="col-sm-6 col-md-4 mb-4" key={pool.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">
                  {pool.token0.symbol} / {pool.token1.symbol}
                </h5>
                <p className="card-text">
                  <strong>Fees (USD):</strong> {parseFloat(pool.feesUSD).toFixed(2)}
                </p>
                <p className="card-text">
                  <strong>Volume (USD):</strong> {parseFloat(pool.volumeUSD).toFixed(2)}
                </p>
                <Button
                  variant="primary"
                  className="mt-3"
                  onClick={() => handleViewDetails(pool)}
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 模态框用于显示池的详细信息 */}
      {selectedPool && (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedPool.token0.symbol} / {selectedPool.token1.symbol} Pool Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Pool ID:</strong> {selectedPool.id}</p>
            <p><strong>Fees (USD):</strong> {parseFloat(selectedPool.feesUSD).toFixed(2)}</p>
            <p><strong>Volume (USD):</strong> {parseFloat(selectedPool.volumeUSD).toFixed(2)}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default Pools;
