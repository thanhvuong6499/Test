import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './giao-vien.reducer';
import { IGiaoVien } from 'app/shared/model/giao-vien.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IGiaoVienDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class GiaoVienDetail extends React.Component<IGiaoVienDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { giaoVienEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="jhipsterApp.giaoVien.detail.title">GiaoVien</Translate> [<b>{giaoVienEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="cMND">
                <Translate contentKey="jhipsterApp.giaoVien.cMND">C MND</Translate>
              </span>
            </dt>
            <dd>{giaoVienEntity.cMND}</dd>
            <dt>
              <span id="hoTen">
                <Translate contentKey="jhipsterApp.giaoVien.hoTen">Ho Ten</Translate>
              </span>
            </dt>
            <dd>{giaoVienEntity.hoTen}</dd>
            <dt>
              <span id="sDT">
                <Translate contentKey="jhipsterApp.giaoVien.sDT">S DT</Translate>
              </span>
            </dt>
            <dd>{giaoVienEntity.sDT}</dd>
            <dt>
              <span id="ngaySinh">
                <Translate contentKey="jhipsterApp.giaoVien.ngaySinh">Ngay Sinh</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={giaoVienEntity.ngaySinh} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="queQuan">
                <Translate contentKey="jhipsterApp.giaoVien.queQuan">Que Quan</Translate>
              </span>
            </dt>
            <dd>{giaoVienEntity.queQuan}</dd>
            <dt>
              <span id="diaChi">
                <Translate contentKey="jhipsterApp.giaoVien.diaChi">Dia Chi</Translate>
              </span>
            </dt>
            <dd>{giaoVienEntity.diaChi}</dd>
            <dt>
              <span id="email">
                <Translate contentKey="jhipsterApp.giaoVien.email">Email</Translate>
              </span>
            </dt>
            <dd>{giaoVienEntity.email}</dd>
            <dt>
              <span id="matKhau">
                <Translate contentKey="jhipsterApp.giaoVien.matKhau">Mat Khau</Translate>
              </span>
            </dt>
            <dd>{giaoVienEntity.matKhau}</dd>
            <dt>
              <span id="dungLuongKho">
                <Translate contentKey="jhipsterApp.giaoVien.dungLuongKho">Dung Luong Kho</Translate>
              </span>
            </dt>
            <dd>{giaoVienEntity.dungLuongKho}</dd>
            <dt>
              <span id="daSuDung">
                <Translate contentKey="jhipsterApp.giaoVien.daSuDung">Da Su Dung</Translate>
              </span>
            </dt>
            <dd>{giaoVienEntity.daSuDung}</dd>
            <dt>
              <span id="capBac">
                <Translate contentKey="jhipsterApp.giaoVien.capBac">Cap Bac</Translate>
              </span>
            </dt>
            <dd>{giaoVienEntity.capBac}</dd>
            <dt>
              <span id="status">
                <Translate contentKey="jhipsterApp.giaoVien.status">Status</Translate>
              </span>
            </dt>
            <dd>{giaoVienEntity.status}</dd>
            <dt>
              <Translate contentKey="jhipsterApp.giaoVien.tailieu">Tailieu</Translate>
            </dt>
            <dd>
              {giaoVienEntity.tailieus
                ? giaoVienEntity.tailieus.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === giaoVienEntity.tailieus.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/giao-vien" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/giao-vien/${giaoVienEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ giaoVien }: IRootState) => ({
  giaoVienEntity: giaoVien.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GiaoVienDetail);
