import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITaiLieu } from 'app/shared/model/tai-lieu.model';
import { getEntities as getTaiLieus } from 'app/entities/tai-lieu/tai-lieu.reducer';
import { getEntity, updateEntity, createEntity, reset } from './giao-vien.reducer';
import { IGiaoVien } from 'app/shared/model/giao-vien.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IGiaoVienUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IGiaoVienUpdateState {
  isNew: boolean;
  idstailieu: any[];
}

export class GiaoVienUpdate extends React.Component<IGiaoVienUpdateProps, IGiaoVienUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idstailieu: [],
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getTaiLieus();
  }

  saveEntity = (event, errors, values) => {
    values.ngaySinh = new Date(values.ngaySinh);

    if (errors.length === 0) {
      const { giaoVienEntity } = this.props;
      const entity = {
        ...giaoVienEntity,
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
    this.props.history.push('/entity/giao-vien');
  };

  tailieuUpdate = element => {
    const selected = Array.from(element.target.selectedOptions).map((e: any) => e.value);
    this.setState({
      idstailieu: keysToValues(selected, this.props.taiLieus, 'id')
    });
  };

  displaytailieu(value: any) {
    if (this.state.idstailieu && this.state.idstailieu.length !== 0) {
      const list = [];
      for (const i in this.state.idstailieu) {
        if (this.state.idstailieu[i]) {
          list.push(this.state.idstailieu[i].id);
        }
      }
      return list;
    }
    if (value.tailieus && value.tailieus.length !== 0) {
      const list = [];
      for (const i in value.tailieus) {
        if (value.tailieus[i]) {
          list.push(value.tailieus[i].id);
        }
      }
      this.setState({
        idstailieu: keysToValues(list, this.props.taiLieus, 'id')
      });
      return list;
    }
    return null;
  }

  render() {
    const isInvalid = false;
    const { giaoVienEntity, taiLieus, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhipsterApp.giaoVien.home.createOrEditLabel">
              <Translate contentKey="jhipsterApp.giaoVien.home.createOrEditLabel">Create or edit a GiaoVien</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : giaoVienEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="giao-vien-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="cMNDLabel" for="cMND">
                    <Translate contentKey="jhipsterApp.giaoVien.cMND">C MND</Translate>
                  </Label>
                  <AvField id="giao-vien-cMND" type="text" name="cMND" />
                </AvGroup>
                <AvGroup>
                  <Label id="hoTenLabel" for="hoTen">
                    <Translate contentKey="jhipsterApp.giaoVien.hoTen">Ho Ten</Translate>
                  </Label>
                  <AvField id="giao-vien-hoTen" type="text" name="hoTen" />
                </AvGroup>
                <AvGroup>
                  <Label id="sDTLabel" for="sDT">
                    <Translate contentKey="jhipsterApp.giaoVien.sDT">S DT</Translate>
                  </Label>
                  <AvField id="giao-vien-sDT" type="text" name="sDT" />
                </AvGroup>
                <AvGroup>
                  <Label id="ngaySinhLabel" for="ngaySinh">
                    <Translate contentKey="jhipsterApp.giaoVien.ngaySinh">Ngay Sinh</Translate>
                  </Label>
                  <AvInput
                    id="giao-vien-ngaySinh"
                    type="datetime-local"
                    className="form-control"
                    name="ngaySinh"
                    value={isNew ? null : convertDateTimeFromServer(this.props.giaoVienEntity.ngaySinh)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="queQuanLabel" for="queQuan">
                    <Translate contentKey="jhipsterApp.giaoVien.queQuan">Que Quan</Translate>
                  </Label>
                  <AvField id="giao-vien-queQuan" type="text" name="queQuan" />
                </AvGroup>
                <AvGroup>
                  <Label id="diaChiLabel" for="diaChi">
                    <Translate contentKey="jhipsterApp.giaoVien.diaChi">Dia Chi</Translate>
                  </Label>
                  <AvField id="giao-vien-diaChi" type="text" name="diaChi" />
                </AvGroup>
                <AvGroup>
                  <Label id="emailLabel" for="email">
                    <Translate contentKey="jhipsterApp.giaoVien.email">Email</Translate>
                  </Label>
                  <AvField id="giao-vien-email" type="text" name="email" />
                </AvGroup>
                <AvGroup>
                  <Label id="matKhauLabel" for="matKhau">
                    <Translate contentKey="jhipsterApp.giaoVien.matKhau">Mat Khau</Translate>
                  </Label>
                  <AvField id="giao-vien-matKhau" type="text" name="matKhau" />
                </AvGroup>
                <AvGroup>
                  <Label id="dungLuongKhoLabel" for="dungLuongKho">
                    <Translate contentKey="jhipsterApp.giaoVien.dungLuongKho">Dung Luong Kho</Translate>
                  </Label>
                  <AvField id="giao-vien-dungLuongKho" type="number" className="form-control" name="dungLuongKho" />
                </AvGroup>
                <AvGroup>
                  <Label id="daSuDungLabel" for="daSuDung">
                    <Translate contentKey="jhipsterApp.giaoVien.daSuDung">Da Su Dung</Translate>
                  </Label>
                  <AvField id="giao-vien-daSuDung" type="number" className="form-control" name="daSuDung" />
                </AvGroup>
                <AvGroup>
                  <Label id="capBacLabel">
                    <Translate contentKey="jhipsterApp.giaoVien.capBac">Cap Bac</Translate>
                  </Label>
                  <AvInput
                    id="giao-vien-capBac"
                    type="select"
                    className="form-control"
                    name="capBac"
                    value={(!isNew && giaoVienEntity.capBac) || 'GIAOVIEN'}
                  >
                    <option value="GIAOVIEN">GIAOVIEN</option>
                    <option value="TRUONGKHOA">TRUONGKHOA</option>
                    <option value="CANBOCAPCAO">CANBOCAPCAO</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel">
                    <Translate contentKey="jhipsterApp.giaoVien.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="giao-vien-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && giaoVienEntity.status) || 'TONTAI'}
                  >
                    <option value="TONTAI">TONTAI</option>
                    <option value="DAXOA">DAXOA</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="taiLieus">
                    <Translate contentKey="jhipsterApp.giaoVien.tailieu">Tailieu</Translate>
                  </Label>
                  <AvInput
                    id="giao-vien-tailieu"
                    type="select"
                    multiple
                    className="form-control"
                    name="faketaiLieus"
                    value={this.displaytailieu(giaoVienEntity)}
                    onChange={this.tailieuUpdate}
                  >
                    <option value="" key="0" />
                    {taiLieus
                      ? taiLieus.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvInput id="giao-vien-tailieu" type="hidden" name="tailieus" value={this.state.idstailieu} />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/giao-vien" replace color="info">
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
  taiLieus: storeState.taiLieu.entities,
  giaoVienEntity: storeState.giaoVien.entity,
  loading: storeState.giaoVien.loading,
  updating: storeState.giaoVien.updating
});

const mapDispatchToProps = {
  getTaiLieus,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GiaoVienUpdate);
