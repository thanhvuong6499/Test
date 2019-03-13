import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITheLoaiTieuChi } from 'app/shared/model/the-loai-tieu-chi.model';
import { getEntities as getTheLoaiTieuChis } from 'app/entities/the-loai-tieu-chi/the-loai-tieu-chi.reducer';
import { getEntity, updateEntity, createEntity, reset } from './tieu-chi-danh-gia.reducer';
import { ITieuChiDanhGia } from 'app/shared/model/tieu-chi-danh-gia.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface ITieuChiDanhGiaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ITieuChiDanhGiaUpdateState {
  isNew: boolean;
  theloaitieuchiId: number;
}

export class TieuChiDanhGiaUpdate extends React.Component<ITieuChiDanhGiaUpdateProps, ITieuChiDanhGiaUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      theloaitieuchiId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getTheLoaiTieuChis();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { tieuChiDanhGiaEntity } = this.props;
      const entity = {
        ...tieuChiDanhGiaEntity,
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
    this.props.history.push('/entity/tieu-chi-danh-gia');
  };

  theloaitieuchiUpdate = element => {
    const id = element.target.value.toString();
    if (id === '') {
      this.setState({
        theloaitieuchiId: -1
      });
    } else {
      for (const i in this.props.theLoaiTieuChis) {
        if (id === this.props.theLoaiTieuChis[i].id.toString()) {
          this.setState({
            theloaitieuchiId: this.props.theLoaiTieuChis[i].id
          });
        }
      }
    }
  };

  render() {
    const isInvalid = false;
    const { tieuChiDanhGiaEntity, theLoaiTieuChis, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhipsterApp.tieuChiDanhGia.home.createOrEditLabel">
              <Translate contentKey="jhipsterApp.tieuChiDanhGia.home.createOrEditLabel">Create or edit a TieuChiDanhGia</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : tieuChiDanhGiaEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="tieu-chi-danh-gia-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="noiDungLabel" for="noiDung">
                    <Translate contentKey="jhipsterApp.tieuChiDanhGia.noiDung">Noi Dung</Translate>
                  </Label>
                  <AvField id="tieu-chi-danh-gia-noiDung" type="text" name="noiDung" />
                </AvGroup>
                <AvGroup>
                  <Label id="levelLabel" for="level">
                    <Translate contentKey="jhipsterApp.tieuChiDanhGia.level">Level</Translate>
                  </Label>
                  <AvField id="tieu-chi-danh-gia-level" type="number" className="form-control" name="level" />
                </AvGroup>
                <AvGroup>
                  <Label for="theloaitieuchi.id">
                    <Translate contentKey="jhipsterApp.tieuChiDanhGia.theloaitieuchi">Theloaitieuchi</Translate>
                  </Label>
                  <AvInput
                    id="tieu-chi-danh-gia-theloaitieuchi"
                    type="select"
                    className="form-control"
                    name="theloaitieuchi.id"
                    onChange={this.theloaitieuchiUpdate}
                  >
                    <option value="" key="0" />
                    {theLoaiTieuChis
                      ? theLoaiTieuChis.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvInput
                    id="tieu-chi-danh-gia-theloaitieuchi"
                    type="hidden"
                    name="theloaitieuchi.id"
                    value={this.state.theloaitieuchiId}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/tieu-chi-danh-gia" replace color="info">
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
  theLoaiTieuChis: storeState.theLoaiTieuChi.entities,
  tieuChiDanhGiaEntity: storeState.tieuChiDanhGia.entity,
  loading: storeState.tieuChiDanhGia.loading,
  updating: storeState.tieuChiDanhGia.updating
});

const mapDispatchToProps = {
  getTheLoaiTieuChis,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TieuChiDanhGiaUpdate);
