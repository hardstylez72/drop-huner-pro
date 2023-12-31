package core

import (
	"context"
	"math/big"
	"strings"

	"github.com/hardstylez72/cry/internal/defi"
	"github.com/hardstylez72/cry/internal/defi/bozdo"
	core_dao "github.com/hardstylez72/cry/internal/defi/bridge/core.dao"
	v1 "github.com/hardstylez72/cry/internal/pb/gen/proto/go/v1"
	"github.com/pkg/errors"
)

func (c *Client) GetBalance(ctx context.Context, req *defi.GetBalanceReq) (_ *defi.GetBalanceRes, err error) {
	defer func() { err = errWrap(err) }()
	return c.defi.GetBalance(ctx, req)
}

func (c *Client) TxViewFn(id string) string {
	return c.defi.TxViewFn(id)
}

func (c *Client) GetNetworkToken() defi.Token {
	return c.defi.GetNetworkToken()
}

func (c *Client) Transfer(ctx context.Context, r *defi.TransferReq) (_ *defi.TransferRes, err error) {
	defer func() { err = errWrap(err) }()
	return c.defi.Transfer(ctx, r)
}

func (c *Client) GetNetworkId() *big.Int {
	return c.NetworkId
}

func (c *Client) WaitTxComplete(ctx context.Context, tx string) error {
	return c.defi.WaitTxComplete(ctx, tx)
}

func (c *Client) OrbiterBridge(ctx context.Context, req *defi.OrbiterBridgeReq) (_ *defi.OrbiterBridgeRes, err error) {

	defer func() { err = errWrap(err) }()
	return c.defi.OrbiterBridge(ctx, req)
}

func (c *Client) GetPublicKey(pk string, subType v1.ProfileSubType) (string, error) {
	return c.defi.GetPublicKey(pk, subType)
}

func (c *Client) Network() v1.Network {
	return c.defi.Cfg.Network
}

func (c *Client) Bridge(ctx context.Context, req *defi.DefaultBridgeReq, taskType v1.TaskType) (_ *bozdo.DefaultRes, err error) {

	defer func() { err = errWrap(err) }()

	switch taskType {
	case v1.TaskType_CoreDaoBridge:
		return core_dao.NewBridge(c.defi).Bridge(ctx, req)
	default:
		return nil, errors.New("unsupported task")
	}
}

func (c *Client) WaitForConfirm(ctx context.Context, txId string, taskType v1.TaskType, receiver string) error {
	switch taskType {
	case v1.TaskType_CoreDaoBridge:
		return core_dao.NewBridge(c.defi).WaitForConfirm(ctx, txId, taskType, receiver)
	default:
		return errors.New("unsupported task")
	}
}

func errWrap(err error) error {
	if err == nil {
		return nil
	}

	if strings.Contains(err.Error(), "insufficient funds for gas") ||
		strings.Contains(err.Error(), "insufficient funds for transfer") ||
		strings.Contains(err.Error(), "eth_estimateGas: execution reverted: Return amount is not enough") ||
		strings.Contains(err.Error(), "not enough balance of CORE") {
		err = &defi.ErrOutOfGas{
			N:     v1.Network_Core,
			Token: v1.Token_CORE,
		}
	}
	return err
}