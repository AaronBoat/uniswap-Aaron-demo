import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// GraphQL 查询
const GET_POOLS = gql`
  {
    pools(first: 50) {
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

function Pools() {
  const { loading, error, data } = useQuery(GET_POOLS);
  const [selectedToken, setSelectedToken] = useState('All');
  const [minVolume, setMinVolume] = useState('');
  const [minFees, setMinFees] = useState('');
  const [sortBy, setSortBy] = useState('None');
  const [showModal, setShowModal] = useState(false);
  const [selectedPool, setSelectedPool] = useState(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [poolsPerPage, setPoolsPerPage] = useState(10);

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        Error: {error.message}
      </div>
    );
  }

  // 处理筛选条件的变化
  const handleTokenChange = (event) => {
    setSelectedToken(event.target.value);
  };

  const handleMinVolumeChange = (event) => {
    setMinVolume(event.target.value);
  };

  const handleMinFeesChange = (event) => {
    setMinFees(event.target.value);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handlePoolsPerPageChange = (event) => {
    setPoolsPerPage(Number(event.target.value));
    setCurrentPage(1); // 重置分页到第一页
  };

  // 打开模态框并设置选中的池子
  const handleViewDetails = (pool) => {
    setSelectedPool(pool);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  // 切换高级筛选器显示
  const toggleAdvancedFilters = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };

  // 根据用户选择的条件筛选交易池
  const filteredPools = data.pools.filter((pool) => {
    const meetsTokenCriteria =
      selectedToken === 'All' ||
      pool.token0.symbol === selectedToken ||
      pool.token1.symbol === selectedToken;
    const meetsVolumeCriteria =
      minVolume === '' || parseFloat(pool.volumeUSD) >= parseFloat(minVolume);
    const meetsFeesCriteria =
      minFees === '' || parseFloat(pool.feesUSD) >= parseFloat(minFees);

    return meetsTokenCriteria && meetsVolumeCriteria && meetsFeesCriteria;
  });

  // 按照用户选择来进行排序
  const sortedPools = [...filteredPools].sort((a, b) => {
    if (sortBy === 'FeesAsc') {
      return parseFloat(a.feesUSD) - parseFloat(b.feesUSD);
    }
    if (sortBy === 'FeesDesc') {
      return parseFloat(b.feesUSD) - parseFloat(a.feesUSD);
    }
    if (sortBy === 'VolumeAsc') {
      return parseFloat(a.volumeUSD) - parseFloat(b.volumeUSD);
    }
    if (sortBy === 'VolumeDesc') {
      return parseFloat(b.volumeUSD) - parseFloat(a.volumeUSD);
    }
    return 0;
  });

  // 分页逻辑
  const indexOfLastPool = currentPage * poolsPerPage;
  const indexOfFirstPool = indexOfLastPool - poolsPerPage;
  const currentPools = sortedPools.slice(indexOfFirstPool, indexOfLastPool);

  const totalPages = Math.ceil(sortedPools.length / poolsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Top Pools</h2>

      {/* 默认的筛选器 */}
      <div className="mb-4 text-center">
        <label htmlFor="tokenSelect" className="form-label">
          Select a Token to filter:
        </label>
        <select
          id="tokenSelect"
          className="form-select w-25 d-inline-block mx-2"
          value={selectedToken}
          onChange={handleTokenChange}
        >
          <option value="All">All</option>
          <option value="USDC">USDC</option>
          <option value="WETH">WETH</option>
          <option value="DAI">DAI</option>
          <option value="USDT">USDT</option>
        </select>

        <label htmlFor="minVolume" className="form-label mx-2">
          Min Volume (USD):
        </label>
        <input
          type="number"
          id="minVolume"
          className="form-control d-inline-block w-25"
          value={minVolume}
          onChange={handleMinVolumeChange}
        />

        <label htmlFor="minFees" className="form-label mx-2">
          Min Fees (USD):
        </label>
        <input
          type="number"
          id="minFees"
          className="form-control d-inline-block w-25"
          value={minFees}
          onChange={handleMinFeesChange}
        />

        <label htmlFor="sortBy" className="form-label mx-2">
          Sort By:
        </label>
        <select
          id="sortBy"
          className="form-select w-25 d-inline-block mx-2"
          value={sortBy}
          onChange={handleSortByChange}
        >
          <option value="None">None</option>
          <option value="FeesAsc">Fees (Ascending)</option>
          <option value="FeesDesc">Fees (Descending)</option>
          <option value="VolumeAsc">Volume (Ascending)</option>
          <option value="VolumeDesc">Volume (Descending)</option>
        </select>
      </div>

      {/* 显示交易池 */}
      <div className="row">
        {currentPools.map((pool) => (
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

      {/* 分页按钮和高级筛选按钮 */}
      <div className="d-flex justify-content-center my-4">
        {!showAdvancedFilters && (
          <Button variant="info" onClick={toggleAdvancedFilters}>
            Show Advanced Filters
          </Button>
        )}
        {showAdvancedFilters && (
          <>
            <Button
              variant="secondary"
              className="mx-2"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="align-self-center">Page {currentPage} of {totalPages}</span>
            <Button
              variant="secondary"
              className="mx-2"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>

            <label htmlFor="poolsPerPage" className="form-label mx-2">
              Pools per Page:
            </label>
            <select
              id="poolsPerPage"
              className="form-select w-25 d-inline-block mx-2"
              value={poolsPerPage}
              onChange={handlePoolsPerPageChange}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>

            <Button variant="info" onClick={toggleAdvancedFilters}>
              Hide Advanced Filters
            </Button>
          </>
        )}
      </div>

      {/* 模态框用于显示池子的详细信息 */}
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
