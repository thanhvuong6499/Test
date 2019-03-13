import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { ITheLoaiTaiLieu } from 'app/shared/model/the-loai-tai-lieu.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './the-loai-tai-lieu.reducer';

export interface ITheLoaiTaiLieuDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class TheLoaiTaiLieuDeleteDialog extends React.Component<ITheLoaiTaiLieuDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.theLoaiTaiLieuEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { theLoaiTaiLieuEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody>
          <Translate contentKey="jhipsterApp.theLoaiTaiLieu.delete.question" interpolate={{ id: theLoaiTaiLieuEntity.id }}>
            Are you sure you want to delete this TheLoaiTaiLieu?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />&nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />&nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ theLoaiTaiLieu }: IRootState) => ({
  theLoaiTaiLieuEntity: theLoaiTaiLieu.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TheLoaiTaiLieuDeleteDialog);
