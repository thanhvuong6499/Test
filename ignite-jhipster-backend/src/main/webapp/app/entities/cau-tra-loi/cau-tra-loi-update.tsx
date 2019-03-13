import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IBanDanhGia } from 'app/shared/model/ban-danh-gia.model';
import { getEntities as getBanDanhGias } from 'app/entities/ban-danh-gia/ban-danh-gia.reducer';
import { ITieuChiDanhGia } from 'app/shared/model/tieu-chi-danh-gia.model';
import { getEntities as getTieuChiDanhGias } from 'app/entities/tieu-chi-danh-gia/tieu-chi-danh-gia.reducer';
import { getEntity, updateEntity, createEntity, reset } from './cau-tra-loi.reducer';
import { ICauTraLoi } from 'app/shared/model/cau-tra-loi.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface ICauTraLoiUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ICauTraLoiUpdateState {
  isNew: boolean;
  bandanhgiaId: number;
  tieuchidanhgiaId: number;
}

export class CauTraLoiUpdate extends React.Component<ICauTraLoiUpdateProps, ICauTraLoiUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      bandanhgiaId: 0,
      tieuchidanhgiaId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getBanDanhGias();
    this.props.getTieuChiDanhGias();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { cauTraLoiEntity } = this.props;
      const entity = {
        ...cauTraLoiEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/cau-tra-loi');
  };

  bandanhgiaUpdate = element => {
    const id = element.target.value.toString();
    if (id === '') {
      this.setState({
        bandanhgiaId: -1
      });
    } else {
      for (const i in this.props.banDanhGias) {
        if (id === this.props.banDanhGias[i].id.toString()) {
          this.setState({
            bandanhgiaId: this.props.banDanhGias[i].id
          });
        }
      }
    }
  };

  tieuchidanhgiaUpdate = element => {
    const id = element.target.value.toString();
    if (id === '') {
      this.setState({
        tieuchidanhgiaId: -1
      });
    } else {
      for (const i in this.props.tieuChiDanhGias) {
        if (id === this.props.tieuChiDanhGias[i].id.toString()) {
          this.setState({
            tieuchidanhgiaId: this.props.tieuChiDanhGias[i].id
          });
        }
      }
    }
  };

  render() {
    const isInvalid = false;
    const { cauTraLoiEntity, banDanhGias, tieuChiDanhGias, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhipsterApp.cauTraLoi.home.createOrEditLabel">
              <Translate contentKey="jhipsterApp.cauTraLoi.home.createOrEditLabel">Create or edit a CauTraLoi</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : cauTraLoiEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="cau-tra-loi-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="thangDiemLabel">
                    <Translate contentKey="jhipsterApp.cauTraLoi.thangDiem">Thang Diem</Translate>
                  </Label>
                  <AvInput
                    id="cau-tra-loi-thangDiem"
                    type="select"
                    className="form-control"
                    name="thangDiem"
                    value={(!isNew && cauTraLoiEntity.thangDiem) || 'CHUADAT'}
                  >
                    <option value="CHUADAT">CHUADAT</option>
                    <option value="DAT">DAT</option>
                    <option value="KHA">KHA</option>
                    <option value="TOT">TOT</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="bandanhgia.id">
                    <Translate contentKey="jhipsterApp.cauTraLoi.bandanhgia">Bandanhgia</Translate>
                  </Label>
                  <AvInput
                    id="cau-tra-loi-bandanhgia"
                    type="select"
                    className="form-control"
                    name="bandanhgia.id"
                    onChange={this.bandanhgiaUpdate}
                  >
                    <option value="" key="0" />
                    {banDanhGias
                      ? banDanhGias.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvInput id="cau-tra-loi-bandanhgia" type="hidden" name="bandanhgia.id" value={this.state.bandanhgiaId} />
                </AvGroup>
                <AvGroup>
                  <Label for="tieuchidanhgia.id">
                    <Translate contentKey="jhipsterApp.cauTraLoi.tieuchidanhgia">Tieuchidanhgia</Translate>
                  </Label>
                  <AvInput
                    id="cau-tra-loi-tieuchidanhgia"
                    type="select"
                    className="form-control"
                    name="tieuchidanhgia.id"
                    onChange={this.tieuchidanhgiaUpdate}
                  >
                    <option value="" key="0" />
                    {tieuChiDanhGias
                      ? tieuChiDanhGias.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvInput id="cau-tra-loi-tieuchidanhgia" type="hidden" name="tieuchidanhgia.id" value={this.state.tieuchidanhgiaId} />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/cau-tra-loi" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={isInvalid || updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  banDanhGias: storeState.banDanhGia.entities,
  tieuChiDanhGias: storeState.tieuChiDanhGia.entities,
  cauTraLoiEntity: storeState.cauTraLoi.entity,
  loading: storeState.cauTraLoi.loading,
  updating: storeState.cauTraLoi.updating
});

const mapDispatchToProps = {
  getBanDanhGias,
  getTieuChiDanhGias,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CauTraLoiUpdate);
